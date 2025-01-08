import {NextFunction, Request, Response} from "express";
// db
import {connectToDB} from "../db/db";
// token lib
import jwt from "jsonwebtoken";
// types
import {ResultSetHeader, RowDataPacket} from "mysql2";  // Подключаем актуальные типы
import {Connection} from "mysql2/promise";
import {UserRequestBody} from "../types/types";
// helpers
import {Validation} from "../helpers/validation";

// Типизация функции получения пользователей
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let connection: Connection;
    try {
        connection = await connectToDB();

        // Выполнение SQL-запроса для получения всех записей из таблицы users
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users');
        console.log('Users in the database:', rows);
        res.json(rows);  // Отправляем результат в ответ
    } catch (error) {
        console.error('❌ Failed to fetch users:', error);
        next(error);  // Перехватываем ошибку и передаем ее в middleware обработки ошибок
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }

    }
};

// Типизация функции добавления пользователя


export const addUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {

    const {name, email, password} = req.body;
    // Проверяем, что и name, и email, и password присутствуют в теле запроса
    if (!name || !email || !password) {
        res.status(400).json({message: 'Name, email, and password are required'});
        return; // Завершаем выполнение функции, чтобы избежать дальнейшего выполнения кода
    }

    if (!Validation.email(email)) {
        res.status(422).json({...Validation.emailResult});
        return;
    }

    if (!Validation.password(password)) {
        res.status(422).json({...Validation.passwordResult});
        return;
    }

    let connection: Connection;

    try {
        connection = await connectToDB();
        const [result] = await connection.execute<ResultSetHeader>('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        await connection.end();

        const token = jwt.sign(
            { userId: result.insertId, email },
            process.env.JWT_SECRET || 'defaultSecret', // Используйте переменную окружения
            { expiresIn: '1h' } // Токен истечет через час
        );

        // Возвращаем ответ с успешным добавлением
        res.status(201).json({message: 'User added successfully', userId: result.insertId, token});
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user'});
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }


    let connection: Connection;

    try {
        connection = await connectToDB();
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({message: 'Failed to delete user'});
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }

        }
    }

}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }

    let connection: Connection;

    try {
        connection = await connectToDB();
        const [result] = await connection.execute<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [req.body.name, req.body.email, req.params.id]);
        res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({message: 'Failed to update user'});
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
}


export const calcualate = (a: number, b: number) => {
    return a + b;
}

