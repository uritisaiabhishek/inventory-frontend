import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside>
        <Link to='/'>Dashboard</Link>
        <Link to='/items'>Items</Link>
        <Link to='/login'>Login</Link>
    </aside>
  )
}

export default Sidebar