import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();  // Загружаем переменные из .env

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'fullstackdb',
    port: Number(process.env.DB_PORT) || 3306,
};

// Функция для выполнения SQL из файла
const executeSqlFromFile = async (connection: mysql.Connection, filePath: string) => {
    try {
        // Читаем содержимое файла
        const sqlQuery = fs.readFileSync(filePath, 'utf-8');

        // Разделяем запросы, если в файле несколько
        const queries = sqlQuery.split(';').map(query => query.trim()).filter(query => query.length > 0);

        // Выполняем каждый запрос
        for (let query of queries) {
            await connection.query(query);
            console.log('Query executed successfully');
        }
    } catch (error) {
        console.error('Error executing SQL from file:', error);
    }
};

export const connectToDB = async () => {
    try {
        // Подключаемся к базе данных
        const connection = await mysql.createConnection(dbConfig);
        console.log('🚀 Database connected successfully');

        // Путь к файлу schema.sql
        const schemaFilePath = path.join(__dirname, 'schema.sql');

        // Выполняем SQL запросы из файла
        await executeSqlFromFile(connection, schemaFilePath);

        return connection;
    } catch (error) {
        console.error('❌ Failed to connect to the database:', error);
        process.exit(1); // Завершаем процесс при ошибке подключения
    }
};
