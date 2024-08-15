import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';

function Items() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchProducts();
  }, [skip, sortBy, order]);

  const fetchProducts = () => {
    axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`)
      .then((response) => {
        setProducts(response.data.products);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handlePageChange = (newSkip) => {
    setSkip(newSkip);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const paginationPages = [];

  if (currentPage > 1) {
    paginationPages.push('First');
    paginationPages.push('Prev');
  }

  paginationPages.push(currentPage);

  if (currentPage < totalPages) {
    paginationPages.push('Next');
    paginationPages.push('Last');
  }

  const handleDelete = (id) => {
    axios.delete(`https://dummyjson.com/products/${id}`).then(
      (response) => {
        toast.error('Product deleted successfully');
        fetchProducts(); // Refresh the product list after deletion
      }
    ).catch(error => {
      console.error("There was an error deleting the product!", error);
    });
  };

  const handleUpdate = (id, newTitle) => {
    axios.put(`https://dummyjson.com/products/${id}`, { title: newTitle }).then(
      (response) => {
        toast.success('Product updated successfully');
        fetchProducts(); // Refresh the product list after updating
      }
    ).catch(error => {
      console.error("There was an error updating the product!", error);
    });
  };

  const handleFeatured = (id) => {
    // Example: update a product to mark as featured
    axios.put(`https://dummyjson.com/products/${id}`, { featured: true }).then(
      (response) => {
        toast.success('Product marked as featured');
        fetchProducts(); // Refresh the product list after marking as featured
      }
    ).catch(error => {
      console.error("There was an error marking the product as featured!", error);
    });
  };

  return (
    <div className='flex'>
      <Sidebar />
      <main>
        {products?.length >0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <td>Seno</td>
                  <td onClick={() => handleSortChange('title')}>Item name</td>
                  <td>Item description</td>
                  <td onClick={() => handleSortChange('stock')}>Item quantity</td>
                  <td onClick={() => handleSortChange('price')}>Price</td>
                  <td>Discount price</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{skip + index + 1}</td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>{(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleFeatured(product.id)}>Featured</button>
                        <button onClick={() => handleUpdate(product.id, 'New Title')}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="center">
              <ul className="pagination">
                {paginationPages.map((page, index) => {
                  if ((page === 'First' && currentPage === 1) || (page === 'Last' && currentPage === totalPages)) {
                    return null; // Hide "First" if on the first page or "Last" if on the last page
                  }

                  if ((page === 'Prev' && currentPage === 1) || (page === 'Next' && currentPage === totalPages)) {
                    return null; // Hide "Prev" if on the first page or "Next" if on the last page
                  }

                  return (
                    <li 
                      key={index} 
                      onClick={() => {
                        if (page === 'First') handlePageChange(0);
                        else if (page === 'Prev') handlePageChange(Math.max(0, skip - limit));
                        else if (page === 'Next') handlePageChange(Math.min((totalPages - 1) * limit, skip + limit));
                        else if (page === 'Last') handlePageChange((totalPages - 1) * limit);
                        else handlePageChange((page - 1) * limit);
                      }}
                      className={page === currentPage ? 'active' : ''}
                    >
                      {page}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )
        :<>Products not found</>
      }
      </main>
    </div>
  );
}

export default Items;
