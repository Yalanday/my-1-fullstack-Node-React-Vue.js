// routes
import routes from "./routes";
//config
import corsOption from "./config-files/cors";
// App
import {AppClass} from "./app";

const myApp = new AppClass(3001, corsOption)


myApp.autoRegisterRoutes(routes);

myApp.startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
})


