const API_URL = 'http://localhost:3001';

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/db`);
  return response.json();
};

export const saveData = async (data) => {
  await fetch(`${API_URL}/db`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const registerUser = async (username, password) => {
  const data = await fetchData();
  
  if (data.users.some(user => user.username === username)) {
    throw new Error('Пользователь уже существует');
  }

  data.users.push({ username, password });
  await saveData(data);
};

export const loginUser = async (username, password) => {
  const data = await fetchData();
  
  const user = data.users.find(user => user.username === username && user.password === password);
  
  if (!user) {
    throw new Error('Неправильное имя пользователя или пароль');
  }

  return user;
};
export const addOrder = async (orderData) => {
  // Получаем текущие данные из базы данных
  const data = await fetchData();

  // Генерируем новый ID для заказа
  const orderId = generateId();

  // Добавляем новый заказ в данные
  const newOrder = {
    id: orderId,
    ...orderData,
  };

  data.orders.push(newOrder);

  // Сохраняем обновленные данные на сервере
  await saveData(data);

  return newOrder;
};

// Функция для генерации уникального ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
