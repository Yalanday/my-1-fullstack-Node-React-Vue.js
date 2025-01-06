import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Используем ts-jest для работы с TypeScript
    testEnvironment: 'node', // Среда выполнения тестов, используем Node.js
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Преобразуем TypeScript файлы с помощью ts-jest
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'], // Указываем расширения файлов
    testMatch: ['**/?(*.)+(spec|test).ts'], // Поиск тестов по шаблону (test или spec)
    collectCoverage: true, // Включить сбор покрытия
};

export default config;
