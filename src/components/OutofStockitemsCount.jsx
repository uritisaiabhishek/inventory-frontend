import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OutofStockitemsCount() {
  const [outOfStockItems, setnoStockItemCount] = useState(0)
  useEffect(()=>{
    axios.get('https://dummyjson.com/products?limit=0').then(
      res => {
        const outOfStockItems = res.data.products.filter(product => product.stock < 1);
        setnoStockItemCount(outOfStockItems.length);
      }
    )
  }, [outOfStockItems]);
  return (
    <div className='card'>OutofStockitemsCount : {outOfStockItems}</div>
  )
}

export default OutofStockitemsCount