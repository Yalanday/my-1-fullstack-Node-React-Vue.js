"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//config
const cors_1 = __importDefault(require("./config-files/cors"));
const port_1 = require("./config-files/port");
// routes
const routes_1 = __importDefault(require("./app/presentation/routes"));
// App
const app_1 = require("./app/app");
const myApp = new app_1.AppClass(port_1.port, cors_1.default);
myApp.autoRegisterRoutes(routes_1.default);
myApp.startServer().catch((error) => {
    console.error('Unhandled Error:', error);
    process.exit(1); // Завершаем процесс при непойманной ошибке
});
