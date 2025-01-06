"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const cors_1 = __importDefault(require("cors"));
const user_services_1 = require("./services/user-services");
const corsOptions = {
    origin: ['http://localhost:3000'], // Разрешенные источники
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
    credentials: true, // Разрешить отправку cookies
    preflightContinue: false, // Обработать OPTIONS-запросы по умолчанию
    optionsSuccessStatus: 204 // Статус для успешных preflight-запросов
};
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Функция для запуска сервера
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Подключаемся к базе данных
        yield (0, db_1.connectToDB)();
        // Запускаем сервер
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Завершаем процесс с кодом ошибки
    }
});
//
app.get('/users', user_services_1.getUsers);
app.post('/users', user_services_1.addUser);
app.delete('/users/:id', user_services_1.deleteUser);
// Обработчик ошибок
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});
// Запуск асинхронной функции в верхнем уровне
startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
});
