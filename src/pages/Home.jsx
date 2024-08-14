import React from 'react'
import ItemsCounter from '../components/ItemsCounter'
import OutofStockitemsCount from '../components/OutofStockitemsCount'
import Sidebar from '../components/sidebar'

function Home() {
  return (
    <div>
        <Sidebar />
        <ItemsCounter />
        <OutofStockitemsCount />
    </div>
  )
}

export default Home