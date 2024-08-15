import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './sidebar.scss'

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    
    console.log("logout");

    localStorage.removeItem('user');

    toast.error('Logged out successfully', {
        position: 'bottom-right',
        theme: 'colored',
    });

    navigate('/login');
  }
  return (
    <aside>
        <span className='logo'>Inventory</span>
        <Link to='/'>Dashboard</Link>
        <Link to='/items'>Items</Link>
        <button onClick={handleLogout}>Logout</button>
    </aside>
  )
}

export default Sidebar
