//config
import corsOption from "./config-files/cors";
import {port} from "./config-files/port";
// routes
import routes from "./app/presentation/routes";
// App
import {AppClass} from "./app/app";

const myApp = new AppClass(port, corsOption)

myApp.autoRegisterRoutes(routes);

myApp.startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
})


