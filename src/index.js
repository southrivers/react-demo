import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
/**
 * reactDom 是用来将component挂到页面上
 * react则是提供了除了我们自身写的hook之外的各种hook的集合
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>
);

