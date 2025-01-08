import express, {Request, Response, NextFunction} from 'express';
import {connectToDB} from './db/db';
import cors from 'cors';
//types
import {Routes} from "./types/types";
// routes
import userRoutes from "./routes/user-router";
import initRoutes from "./routes/init-router";

const corsOption = {
    origin: ['http://localhost:3000'],  // Разрешенные источники
    methods: ['GET', 'POST', 'PUT', 'DELETE'],               // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'],        // Разрешенные заголовки
    credentials: true,                                        // Разрешить отправку cookies
    preflightContinue: false,                                  // Обработать OPTIONS-запросы по умолчанию
    optionsSuccessStatus: 204                                  // Статус для успешных preflight-запросов
};

class AppClass {
    app: express.Application;
    PORT: number | string;

    constructor(port: number, corsOptions: cors.CorsOptions) {
        this.app = express();
        this.initializeMiddleware();
        this.setConfigCors(corsOptions);
        this.PORT = process.env.PORT || port;
    }

    // Метод для настройки middleware
    private initializeMiddleware = () => this.app.use(express.json());

    private setConfigCors = (configurations: cors.CorsOptions) => this.app.use(cors(configurations));

// Метод для запуска сервера
    startServer = async () => {
        try {
            await connectToDB();

            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });

            // Обработчик ошибок - добавляем после запуска сервера
            this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                res.status(500).json({message: 'Something went wrong', error: err.message});
            });

        } catch (error) {
            console.error('Error starting server:', error);
            process.exit(1);  // Завершаем процесс с кодом ошибки
        }
    };

    public autoRegisterRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app[route.method](route.path, route.handler);
        });
    }
}

const routes: Routes[] = [...initRoutes, ...userRoutes]

const myApp = new AppClass(3001, corsOption)
myApp.autoRegisterRoutes(routes);

myApp.startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
})


