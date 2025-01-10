import {Routes} from "../../../types/types";
import {Request, Response} from "express";

const initHandler = (req: Request, res: Response): void => {
    res.send(`<h1>Hello, Worddd!</h1>`);
}

const  initRoutes: Routes[] = [
    {method: 'get', path: '/', handler: initHandler},
];

export default initRoutes;
