import express, {Request, Response, NextFunction} from 'express';
import {connectToDB} from './db/db';
import cors from 'cors';
import {getUsers, addUser, deleteUser, updateUser} from "./services/user-services";

const corsOptions = {
    origin: ['http://localhost:3000'],  // Разрешенные источники
    methods: ['GET', 'POST', 'PUT', 'DELETE'],               // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'],        // Разрешенные заголовки
    credentials: true,                                        // Разрешить отправку cookies
    preflightContinue: false,                                  // Обработать OPTIONS-запросы по умолчанию
    optionsSuccessStatus: 204                                  // Статус для успешных preflight-запросов
};


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Функция для запуска сервера
const startServer = async () => {
    try {
        // Подключаемся к базе данных
        await connectToDB();

        // Запускаем сервер
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);  // Завершаем процесс с кодом ошибки
    }
};

//
app.get('/users', getUsers);
app.post('/users', addUser);
app.delete('/users/:id', deleteUser);
app.put('/users/:id', updateUser);

// Обработчик ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: 'Something went wrong', error: err.message});
});

// Запуск асинхронной функции в верхнем уровне
startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
})


