import {Connection} from "mysql2/promise";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {connectToDB} from "../../db/db";


export const deleteUserData = async (id: string): Promise<void> => {
    let connection: Connection;

    try {
        connection = await connectToDB();
        await connection.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
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


export const getAllUsersData = async (): Promise<RowDataPacket[]> => {
    let connection: Connection;

    try {
        connection = await connectToDB();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM users');
        return rows;
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
