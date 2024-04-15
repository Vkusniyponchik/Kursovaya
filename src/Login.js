import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    localStorage.setItem('userData', JSON.stringify({ username, password }));
  
    onLogin({ username, password });
  };
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Логин:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', fontSize: '16px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: '10px', padding: '8px', fontSize: '16px' }}
          />
        </label>
      </div>
      <div>
      <button 
  type="submit"
  style={{ 
    padding: '10px 20px', 
    backgroundColor: 'black', 
    color: 'white', 
    borderRadius: '20px', 
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s'
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = 'black';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
  }}
>
  Войти
</button>

      </div>
    </form>
  );
}

export default LoginForm;
