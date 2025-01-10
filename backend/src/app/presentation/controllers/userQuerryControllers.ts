import {Request,Response, NextFunction} from "express";
import {deleteUserData, getAllUsersData} from "../../repositories/userQueryRepositories";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUsersData();
        res.json(users);
    } catch (error) {
        console.error('❌ Failed to fetch users:', error);
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }

    try {
        await deleteUserData(req.params.id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({message: 'Failed to delete user'});
    }
}
