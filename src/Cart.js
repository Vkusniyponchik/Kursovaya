import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';

export default function Cart({ cartItems, clearCart, currentUser }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + parseFloat(item.price.replace(' руб.', ''));
    }, 0);

    setTotalPrice(total);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!currentUser) {
      console.error('Ошибка: currentUser не установлен');
      return;
    }
  
    try {
      if (typeof totalPrice !== 'number') {
        console.error('Ошибка: totalPrice не является числом:', totalPrice);
        return;
      }
  
      const orderData = {
        username: currentUser,
        items: cartItems,
        totalPrice: totalPrice.toFixed(2),
        date: new Date().toISOString(),
      };
  
      console.log('Отправляем заказ:', orderData); // Для отладки
  
      // Отправляем заказ на сервер через прокси
      await axiosInstance.post('http://localhost:3001/orders', orderData);
      
      alert('Заказ оформлен успешно!');
  
      // Очищаем корзину после успешного оформления заказа
      clearCart();
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error.response ? error.response.data : error.message);
      alert('Произошла ошибка при оформлении заказа. Проверьте консоль для подробностей.');
    }
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Корзина</h2>
      <div style={{ height: '400px', overflowY: 'scroll', marginBottom: '20px' }}>
        {cartItems.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p>Итоговая сумма: {totalPrice.toFixed(2)} руб.</p>
      <div>
        <button 
          style={{ 
            padding: '15px 25px', 
            backgroundColor: 'black', 
            color: 'white', 
            borderRadius: '20px', 
            border: 'none', 
            transition: 'background-color 0.3s, color 0.3s, border 0.3s' 
          }}
          onClick={clearCart}
        >
          Очистить корзину
        </button>
        <button 
          style={{ 
            padding: '15px 25px', 
            backgroundColor: 'black', 
            color: 'white', 
            borderRadius: '20px', 
            border: 'none', 
            transition: 'background-color 0.3s, color 0.3s, border 0.3s' 
          }}
          onClick={handleCheckout}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
