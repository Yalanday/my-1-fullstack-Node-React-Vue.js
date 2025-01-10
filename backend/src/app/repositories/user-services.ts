// types
import {ResultSetHeader} from "mysql2";  // Подключаем актуальные типы
import {Connection} from "mysql2/promise";
import {connectToDB} from "../../db/db";



export const addUserToDB = async (name: string, email: string, password: string): Promise<number> => {
    let connection: Connection;

    try {
        connection = await connectToDB();
        const [result] = await connection.execute<ResultSetHeader>('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return result.insertId;
    } catch (error) {
        throw error;
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

export const updateUserData = async (id: string, name: string, email: string): Promise<void> => {
    let connection: Connection;

    try {
        connection = await connectToDB();
        await connection.execute<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    } catch (error) {
        throw error;
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


