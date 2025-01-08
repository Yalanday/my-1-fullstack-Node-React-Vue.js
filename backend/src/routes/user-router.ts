import {addUser, deleteUser, getUsers, updateUser} from "../services/user-services";
import {Routes} from "../types/types";

const userRoutes: Routes[] = [
    {method: 'get', path: '/users', handler: getUsers},
    {method: 'post', path: '/users', handler: addUser},
    {method: 'delete', path: '/users/:id', handler: deleteUser},
    {method: 'put', path: '/users/:id', handler: updateUser}
];

export default userRoutes
