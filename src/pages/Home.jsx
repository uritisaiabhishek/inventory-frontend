import React, { useEffect, useState } from 'react';
import ItemsCounter from '../components/ItemsCounter';
import OutofStockitemsCount from '../components/OutofStockitemsCount';
import Sidebar from '../components/Sidebar';
import '../components/card.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='flex'>
      {user && (
        <>
          <Sidebar />
          <main>
            <ItemsCounter />
            <OutofStockitemsCount />
          </main>
        </>
      )}
    </div>
  );
}

export default Home;
