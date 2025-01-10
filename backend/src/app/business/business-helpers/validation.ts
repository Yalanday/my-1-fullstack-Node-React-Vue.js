export class Validation {
    private static readonly emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    private static readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    static email(email: string): boolean {
        return this.emailRegex.test(email);
    }

    static emailResult = {
        message: 'Invalid email format',
        tips: [
            'Email должен содержать символ "@"',
            'Email должен содержать доменное имя (например, mail.com)',
            'Email должен содержать допустимые символы (буквы, цифры, точки, дефисы и подчеркивания)'
        ]
    }

    static password(password: string): boolean {
        return this.passwordRegex.test(password);
    }

    static passwordResult = {
        message: 'Invalid password',
        tips: [
            'Пароль должен содержать минимум 8 символов',
            'Пароль должен содержать хотя бы одну строчную букву',
            'Пароль должен содержать хотя бы одну цифру',
            'Пароль должен содержать хотя бы один специальный символ (например, @$!%*?&)'
        ]
    }
}
