const corsOption = {
    origin: ['http://localhost:3000'],  // Разрешенные источники
    methods: ['GET', 'POST', 'PUT', 'DELETE'],               // Разрешенные HTTP-методы
    allowedHeaders: ['Content-Type', 'Authorization'],        // Разрешенные заголовки
    credentials: true,                                        // Разрешить отправку cookies
    preflightContinue: false,                                  // Обработать OPTIONS-запросы по умолчанию
    optionsSuccessStatus: 204                                  // Статус для успешных preflight-запросов
};

export default corsOption;
