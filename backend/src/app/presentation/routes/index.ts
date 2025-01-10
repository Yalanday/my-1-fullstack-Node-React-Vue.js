import {Routes} from "../../../types/types";
import initRoutes from "./init-router";
import userRoutes from "./user-router";

const routes: Routes[] = [...initRoutes, ...userRoutes];

export default routes;
