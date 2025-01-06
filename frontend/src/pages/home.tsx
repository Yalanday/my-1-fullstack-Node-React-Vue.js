import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Типизируем массив пользователей
  const [error, setError] = useState<string | null>(null); // error может быть строкой или null
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email) {
      setError("Name and email are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // Отправляем имя и почту
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setError(null);
        alert("User added successfully!");
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('Error adding user: ' + error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    // Функция для запроса пользователей
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUsers(data);  // Сохраняем пользователей в state
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error: unknown) { // Типизация ошибки
        if (error instanceof Error) {
          setError(error.message);  // Записываем сообщение ошибки
        } else {
          setError('Unknown error occurred');
        }
      }
    };



    fetchUsers();
  }, [name]);  // Пустой массив зависимостей - запрос будет выполнен один раз при монтировании компонента

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div>
        <h1>Users</h1>
        {users.length === 0 ? (
            <p>No users found</p>
        ) : (
            <ul>
              {users.map((user) => (
                  <li key={user.id}>{user.name}({user.id})</li>  // Замените на реальный ключ и имя пользователя
              ))}
            </ul>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user's name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button type="submit">Add User</button>
        </form>
      </div>
  );
}

export default Home;
