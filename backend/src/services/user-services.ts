import {NextFunction, Request, Response} from "express";
import {connectToDB} from "../db/db";
import {OkPacket, RowDataPacket} from "mysql2";  // Подключаем актуальные типы
//
// Типизация функции получения пользователей
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const connection = await connectToDB();

    try {
        // Выполнение SQL-запроса для получения всех записей из таблицы users
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users');
        console.log('Users in the database:', rows);
        res.json(rows);  // Отправляем результат в ответ
    } catch (error) {
        console.error('❌ Failed to fetch users:', error);
        next(error);  // Перехватываем ошибку и передаем ее в middleware обработки ошибок
    } finally {
        await connection.end();
    }
};

// Типизация функции добавления пользователя
interface UserRequestBody {
    id?: number
    name: string;
    email: string; // Ожидаем email в запросе
}

export const addUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {name, email} = req.body;

    // Проверяем, что и name, и email присутствуют в теле запроса
    if (!name || !email) {
        res.status(400).json({message: 'Name and email are required'});
        return;
    }

    try {
        // Подключаемся к базе данных
        const connection = await connectToDB();

        // Выполняем SQL-запрос для добавления нового пользователя
        const [result] = await connection.execute<OkPacket>('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        await connection.end();

        // Возвращаем ответ с успешным добавлением
        res.status(201).json({message: 'User added successfully', userId: result.insertId});
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user'});
    }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }

    try {
        const connection = await connectToDB();
        const [result] = await connection.execute<OkPacket>('DELETE FROM users WHERE id = ?', [req.params.id]);
        await connection.end();
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({message: 'Failed to delete user'});
    }
}

export const calcualate = (a: number, b: number) => {
    return a + b;
}

