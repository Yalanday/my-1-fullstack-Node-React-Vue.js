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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcualate = exports.updateUser = exports.deleteUser = exports.addUser = exports.getUsers = void 0;
const db_1 = require("../db/db");
//
// Типизация функции получения пользователей
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.connectToDB)();
    try {
        // Выполнение SQL-запроса для получения всех записей из таблицы users
        const [rows] = yield connection.execute('SELECT * FROM users');
        console.log('Users in the database:', rows);
        res.json(rows); // Отправляем результат в ответ
    }
    catch (error) {
        console.error('❌ Failed to fetch users:', error);
        next(error); // Перехватываем ошибку и передаем ее в middleware обработки ошибок
    }
    finally {
        yield connection.end();
    }
});
exports.getUsers = getUsers;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    // Проверяем, что и name, и email присутствуют в теле запроса
    if (!name || !email) {
        res.status(400).json({ message: 'Name and email are required' });
        return;
    }
    try {
        // Подключаемся к базе данных
        const connection = yield (0, db_1.connectToDB)();
        // Выполняем SQL-запрос для добавления нового пользователя
        const [result] = yield connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        yield connection.end();
        // Возвращаем ответ с успешным добавлением
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    }
    catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
});
exports.addUser = addUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }
    try {
        const connection = yield (0, db_1.connectToDB)();
        const [result] = yield connection.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        yield connection.end();
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).json({ message: 'Id is required' });
        return;
    }
    try {
        const connection = yield (0, db_1.connectToDB)();
        const [result] = yield connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [req.body.name, req.body.email, req.params.id]);
        yield connection.end();
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
const calcualate = (a, b) => {
    return a + b;
};
exports.calcualate = calcualate;
