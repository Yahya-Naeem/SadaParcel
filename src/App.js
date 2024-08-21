import './App.css';
import React from 'react';
import Dashboard from './components/dashboard/dashboard';
import Cart from './components/cart/cart';
import Product from './components/product/product';
import {useRoutes} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
function App() {
  //using route hook for routing
  let element = useRoutes(
    [
      {
        path:"/",
        element:<Dashboard />,
      },
      {
        path:'/cart',
        element:<Cart />,
      },
      { path:'/products/:productid',
        element: <Product />
      }
    ]
  )
  return (
    <div className="App">
      <Navbar />
      {element}
    </div>
  );
}

export default App;
