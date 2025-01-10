import {addUserToDB, updateUserData} from "../repositories/user-services";
import {Validation} from "./business-helpers/validation";


export const addUserBusinessLogic = async (name: string, email: string, password: string): Promise<number> => {
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }

    if (!Validation.email(email)) {
        throw new Error('Invalid email');
    }

    if (!Validation.password(password)) {
        throw new Error('Invalid password');
    }

    return await addUserToDB(name, email, password);
}

export const updateUserBusinessLogic = async (id: string, name: string, email: string): Promise<void> => {
    await updateUserData(id, name, email);
}
