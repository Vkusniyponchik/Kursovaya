import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { getOrders } from './axiosInstance';

export default function Profile() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:3001/users?username=${loginData.username}&password=${loginData.password}`);
      
      if (response.data.length > 0) {
        setMessage('Вошел в аккаунт успешно');
        setCurrentUser(loginData.username);
        localStorage.setItem('currentUser', loginData.username);
      } else {
        setMessage('Неправильно введенные данные');
      }
    } catch (error) {
      setMessage('Ошибка при входе');
      console.error('Ошибка при входе:', error);
    }
  };
  
  const handleRegister = async () => {
    try {
      await axiosInstance.post('http://localhost:3001/users', {
        username: loginData.username,
        password: loginData.password,
      });
      setMessage('Зарегистрирован успешно');
    } catch (error) {
      setMessage('Ошибка регистрации');
      console.error('Ошибка при регистрации:', error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const fetchedOrders = await getOrders(currentUser);
        console.log('Fetched orders:', fetchedOrders);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchUserOrders();
  }, [currentUser]);
  
  
  console.log('currentUser:', currentUser);
  console.log('orders:', orders);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Профиль</h2>
      {currentUser ? (
        <div>
          <p>{message}</p>
          <h3>Ваши заказы</h3>
          {loading ? (
            <p style={{ fontStyle: 'italic' }}>Загрузка...</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
              ) : (
                orders.map((order) => (
                  <li key={order.id} style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', padding: '15px', backgroundColor: '#f9f9f9' }}>
                    <p style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Дата: {new Date(order.date).toLocaleDateString()}</p>
                    <p>Итоговая сумма: {order.totalPrice} руб.</p>
                    <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
                      {order.items.map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                          <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                          <span>{item.name} - {item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              )}
            </ul>
          )}
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', borderRadius: '20px', border: 'none', marginTop: '20px', fontSize: '16px', cursor: 'pointer' }}>Выйти</button>
        </div>
      ) : (
        <>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Логин"
              value={loginData.username}
              onChange={handleInputChange}
              style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={handleInputChange}
              style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              style={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '20px',
                border: 'none',
                marginRight: '10px',
                fontSize: '16px',
              }}
            >
              Войти
            </button>
            <button
              onClick={handleRegister}
              style={{
                padding: '10px 20px',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '20px',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Зарегистрироваться
            </button>
          </div>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
}
