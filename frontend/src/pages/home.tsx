import React, { useEffect, useState } from "react";

interface IUser {
    id: number;
    name: string;
    email: string
}


const Home: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]); // Типизируем массив пользователей
    const [error, setError] = useState<string | null>(null); // error может быть строкой или null
    const [errorTips, setErrorTips] = useState<string[] | null>(null)
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !password) {
            setError("Имя, email и пароль обязательны");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setName("");
                setEmail("");
                setPassword("");
                setError(null);
                const data = await response.json()
                localStorage.setItem("token", data.token)

                alert("User added successfully!");
                
            } else {
                const errorData = await response.json(); // Извлекаем данные ошибки в формате JSON
                setErrorTips(errorData.tips)
                setError(errorData.message || 'Ошибка регистрации пользователя');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError('Error adding user: ' + error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };


    const delUser = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("User deleted successfully!");
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError('Error deleting user: ' + error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const updateUser = async (id: number, name: string = 'mama', email: string = 'maj@ma.ru') => {
        try {
            const res = await fetch(`http://localhost:3001/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",  // Указываем, что отправляем JSON
                },
                body: JSON.stringify({ name, email })  // Преобразуем объект в JSON
            });

            if (res.ok) {
                // Дальше можно обработать успешный ответ, например, получить обновленные данные
                const updatedUser = await res.json();
                console.log(updatedUser);
            } else {
                // Если что-то пошло не так
                console.error("Ошибка обновления пользователя");
            }
        } catch (error) {
            console.error("Произошла ошибка при запросе:", error);
        }
    }

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

    return (
        <div>
            <h1>Users</h1>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li
                            onClick={async () => await updateUser(user.id, 'papa', 'asdf@dsf.com')}
                            key={user.id}>
                            {user.name}({user.id})
                            <button onClick={async () => await delUser(user.id)} >УДАЛИТЬ</button>
                        </li>  // Замените на реальный ключ и имя пользователя
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
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {
                    errorTips?.map((item, index) => (
                        <p key={index}>
                            {item}
                        </p>
                    ))
                }

                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default Home;
