import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
      const tokenExpiresIn = user.tokenExpiresIn || 30 * 60 * 1000; // 30 minutes in milliseconds
      const expirationTime = new Date().getTime() + tokenExpiresIn;

      // Automatically refresh the token before it expires
      const refreshInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        if (currentTime >= expirationTime) {
          refreshAuthToken(user.refreshToken);
        }
      }, tokenExpiresIn - 60 * 1000); // refresh 1 minute before expiration

      return () => clearInterval(refreshInterval); // cleanup interval on unmount
    }
  }, [user, navigate]);

  const handleLogin = () => {
    setLoading(true);
    toast.dismiss();
    axios
      .post('https://dummyjson.com/auth/login', {
        username: username,
        password: password,
        expiresInMins: 30,
      })
      .then(function (response) {
        console.log(response);
        const tokenExpiresIn = response.data.expiresInMins * 60 * 1000; // convert minutes to milliseconds
        const userData = {
          ...response.data,
          tokenExpiresIn,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
        toast.success('Logged in successfully', {
          position: 'bottom-right',
          theme: 'colored',
        });
      })
      .catch(function (error) {
        toast.error('Login failed', {
          position: 'bottom-right',
          theme: 'colored',
        });
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when login is complete
      });
  };

  const refreshAuthToken = (refreshToken) => {
    fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
        expiresInMins: 30, // optional, defaults to 60
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Token refreshed:', data);
      const tokenExpiresIn = data.expiresInMins * 60 * 1000;
      const updatedUser = {
        ...user,
        ...data,
        tokenExpiresIn,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Session refreshed successfully', {
        position: 'bottom-right',
        theme: 'colored',
      });
    })
    .catch((error) => {
      toast.error('Failed to refresh session', {
        position: 'bottom-right',
        theme: 'colored',
      });
      console.log(error);
    });
  };

  return (
    <main className='login_screen'>
      <div className='login_container'>
        <h1>Login</h1>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </main>
  );
}

export default Login;
