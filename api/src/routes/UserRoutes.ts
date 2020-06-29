import {Request, Response, Router} from "express";
import {IUserModel, UserSchema} from "../models/UserModel";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response, next) => {
   const users = await UserSchema.find();
   return res.json(users);
});

userRouter.post('/', async (req: Request, res: Response, next) => {
    const body: IUserModel = req.body;
    const user = await UserSchema.create(body);
    return res.json(user);
});

export {userRouter}
