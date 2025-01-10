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
exports.updateUserData = exports.addUser = void 0;
// db
const db_1 = require("../db/db");
// token lib
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// business-helpers
const validation_1 = require("../business/business-helpers/validation");
// Типизация функции получения пользователей
// export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     let connection: Connection;
//     try {
//         connection = await connectToDB();
//
//         // Выполнение SQL-запроса для получения всех записей из таблицы users
//         const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users');
//         console.log('Users in the database:', rows);
//         res.json(rows);  // Отправляем результат в ответ
//     } catch (error) {
//         console.error('❌ Failed to fetch users:', error);
//         next(error);  // Перехватываем ошибку и передаем ее в middleware обработки ошибок
//     } finally {
//         if (connection) {
//             try {
//                 await connection.end();
//             } catch (closeError) {
//                 console.error('❌ Error closing connection:', closeError);
//             }
//         }
//
//     }
// };
// export const getAllUsersData = async (): Promise<RowDataPacket[]> => {
//     let connection: Connection;
//
//     try {
//         connection = await connectToDB();
//         const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users');
//         return rows;
//     } catch (error) {
//         throw error;
//     } finally {
//         if (connection) {
//             try {
//                 await connection.end();
//             } catch (closeError) {
//                 console.error('❌ Error closing connection:', closeError);
//             }
//         }
//     }
// }
// Типизация функции добавления пользователя
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Проверяем, что и name, и email, и password присутствуют в теле запроса
    if (!name || !email || !password) {
        res.status(400).json({ message: 'Name, email, and password are required' });
        return; // Завершаем выполнение функции, чтобы избежать дальнейшего выполнения кода
    }
    if (!validation_1.Validation.email(email)) {
        res.status(422).json(Object.assign({}, validation_1.Validation.emailResult));
        return;
    }
    if (!validation_1.Validation.password(password)) {
        res.status(422).json(Object.assign({}, validation_1.Validation.passwordResult));
        return;
    }
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        const [result] = yield connection.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        yield connection.end();
        const token = jsonwebtoken_1.default.sign({ userId: result.insertId, email }, process.env.JWT_SECRET || 'defaultSecret', // Используйте переменную окружения
        { expiresIn: '1h' } // Токен истечет через час
        );
        // Возвращаем ответ с успешным добавлением
        res.status(201).json({ message: 'User added successfully', userId: result.insertId, token });
    }
    catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({ message: 'Failed to add user' });
    }
    finally {
        if (connection) {
            try {
                yield connection.end();
            }
            catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
});
exports.addUser = addUser;
// export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if (!req.params.id) {
//         res.status(400).json({message: 'Id is required'});
//         return;
//     }
//
//
//     let connection: Connection;
//
//     try {
//         connection = await connectToDB();
//         const [result] = await connection.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [req.params.id]);
//         res.status(200).json({message: 'User deleted successfully'});
//     } catch (error) {
//         console.error('❌ Error deleting user:', error);
//         res.status(500).json({message: 'Failed to delete user'});
//     } finally {
//         if (connection) {
//             try {
//                 await connection.end();
//             } catch (closeError) {
//                 console.error('❌ Error closing connection:', closeError);
//             }
//
//         }
//     }
// }
// export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if (!req.params.id) {
//         res.status(400).json({message: 'Id is required'});
//         return;
//     }
//
//     let connection: Connection;
//
//     try {
//         connection = await connectToDB();
//         const [result] = await connection.execute<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [req.body.name, req.body.email, req.params.id]);
//         res.status(200).json({message: 'User updated successfully'});
//     } catch (error) {
//         console.error('❌ Error updating user:', error);
//         res.status(500).json({message: 'Failed to update user'});
//     } finally {
//         if (connection) {
//             try {
//                 await connection.end();
//             } catch (closeError) {
//                 console.error('❌ Error closing connection:', closeError);
//             }
//         }
//     }
// }
const updateUserData = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield (0, db_1.connectToDB)();
        yield connection.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    }
    catch (error) {
        throw error;
    }
    finally {
        if (connection) {
            try {
                yield connection.end();
            }
            catch (closeError) {
                console.error('❌ Error closing connection:', closeError);
            }
        }
    }
});
exports.updateUserData = updateUserData;
