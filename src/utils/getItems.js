import React, { useEffect } from 'react'

function getItems() {
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(json => console.log(json))
  }, []);
  return (
    <div>getItems</div>
  )
}

export default getItems