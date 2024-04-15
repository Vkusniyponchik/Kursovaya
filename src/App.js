import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BackgroundImg from '../src/Images/BackGround.png';
import './App.css';
import PopularItems from './Images/PopularItems.png';
import { Navigation } from './Components/Navigation';
import Home from './Home';
import Categories from './Categories';
import Profile from './Profile';
import Cart from './Cart';
import { Link } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [cartItems, setCartItems] = useState([]); 

  const clearCart = () => {
    console.log("Clearing cart");
    setCartItems([]);
  };


  const data = [
    {
      name: 'Rode NT1-Kit', 
      img: '/Products/Product1.png',
      price: '14944 руб.'
    },
    {
      name: 'JBL 305 MkII',
      img: '/Products/Product2.png',
      price: '17197 руб.'
    },
    {
      name: 'Beyerdynamic DT 990 PRO',
      img: '/Products/Product3.png',
      price: '8645 руб.'
    },
    {
      name: 'Akai Pro MPK Mini ',
      img: '/Products/Product4.png',
      price: '7072 руб.'
    },
    {
      name: 'Behringer U-Phoria',
      img: '/Products/Product5.png',
      price: '17197 руб.'
    },
    {
      name: 'Beyerdynamic DT 770',
      img: '/Products/Product6.png',
      price: '17197 руб.'
    },
    {
      name: 'Rode NT1-Kit',
      img: '/Products/Product7.png',
      price: '17197 руб.'
    },
    {
      name: 'Yamaha HS5',
      img: '/Products/Priduct8.png',
      price: '17197 руб.'
    }
  ];
  const handleLogin = (userData) => {
    setCurrentUser(userData.username);
    localStorage.setItem('currentUser', userData.username);
  };
  
  return (
    <div className="App">
      <div className='header-div'>  
        <Link className='Logo' to='/home'>GoodMusic</Link>
        <Link className='categories' to='/categories'>Категории</Link>
        <Link className='header-items' to='/cart'>Корзина ({cartItems.length})</Link>
        <Link className='header-items' to='/profile'>Профиль</Link>
      </div>
      <Routes>
        <Route path="/home" element={<Home setCartItems={setCartItems} data={data} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} clearCart={clearCart} currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
