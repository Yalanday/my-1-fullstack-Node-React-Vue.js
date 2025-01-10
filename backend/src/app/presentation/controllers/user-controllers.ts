import {Request, Response} from 'express';
import {NextFunction} from "express";
import {addUserBusinessLogic, updateUserBusinessLogic} from "../../business/user-service";
import {generateToken} from "../presentation-helpers/generate-token";
import {UserRequestBody} from "../../../types/types";

export const addUser = async (req: Request<{}, {}, UserRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    const {name, email, password} = req.body;

    try {
        const userId = await addUserBusinessLogic(name, email, password);
        const token = generateToken(userId, email);
        res.status(201).json({message: 'User added successfully', userId, token});
    } catch (error) {
        console.error('❌ Error adding user:', error);
        res.status(500).json({message: 'Failed to add user'});
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.params.id) {
        res.status(400).json({message: 'Id is required'});
        return;
    }

    try {
        await updateUserBusinessLogic(req.params.id, req.body.name, req.body.email);
        res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        console.error('❌ Error updating user:', error);
        res.status(500).json({message: 'Failed to update user'});
    }
}
