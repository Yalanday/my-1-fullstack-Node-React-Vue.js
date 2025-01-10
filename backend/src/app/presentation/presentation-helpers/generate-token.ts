import jwt from "jsonwebtoken";

export const generateToken = (userId: number, email: string): string => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET || 'defaultSecret', // Используйте переменную окружения
        { expiresIn: '1h' } // Токен истечет через час
    );
}
