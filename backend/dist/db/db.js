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
exports.connectToDB = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Загружаем переменные из .env
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'fullstackdb',
    port: Number(process.env.DB_PORT) || 3306,
};
// Функция для выполнения SQL из файла
const executeSqlFromFile = (connection, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Читаем содержимое файла
        const sqlQuery = fs_1.default.readFileSync(filePath, 'utf-8');
        // Разделяем запросы, если в файле несколько
        const queries = sqlQuery.split(';').map(query => query.trim()).filter(query => query.length > 0);
        // Выполняем каждый запрос
        for (let query of queries) {
            yield connection.query(query);
            console.log('Query executed successfully');
        }
    }
    catch (error) {
        console.error('Error executing SQL from file:', error);
    }
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Подключаемся к базе данных
        const connection = yield promise_1.default.createConnection(dbConfig);
        console.log('🚀 Database connected successfully');
        // Путь к файлу schema.sql
        const schemaFilePath = path_1.default.join(__dirname, 'schema.sql');
        // Выполняем SQL запросы из файла
        yield executeSqlFromFile(connection, schemaFilePath);
        return connection;
    }
    catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1); // Завершаем процесс при ошибке подключения
    }
});
exports.connectToDB = connectToDB;
