import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ItemsCounter() {
  const [itemCount, setItemCount] = useState(0)
  useEffect(()=>{
    axios.get('https://dummyjson.com/products?limit=0').then(
      res => setItemCount(res.data.products.length)
    )
  }, [itemCount]);

  return (
    <div className='card'>
      Total items : {itemCount}
    </div>
  )
}

export default ItemsCounter