import {Routes} from "../../../types/types";
import {deleteUser, getAllUsers} from "../controllers/userQuerryControllers";
import {addUser, updateUser} from "../controllers/user-controllers";

const userRoutes: Routes[] = [
    {method: 'get', path: '/users', handler: getAllUsers},
    {method: 'post', path: '/users', handler: addUser},
    {method: 'delete', path: '/users/:id', handler: deleteUser},
    {method: 'put', path: '/users/:id', handler: updateUser}
];

export default userRoutes
