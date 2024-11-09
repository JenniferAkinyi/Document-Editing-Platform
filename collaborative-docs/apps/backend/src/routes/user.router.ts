import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { postUser } from "../controllers/userController";
import { fetchById } from "../controllers/userController";
import { updatedUserById } from "../controllers/userController";
import { deleteUserById } from "../controllers/userController";
import { asyncHandler } from "../utils/handler";

const userRouter = Router();

userRouter.get('/', asyncHandler(getAllUsers))
userRouter.post('/', asyncHandler(postUser))
userRouter.get('/:id', asyncHandler(fetchById))
userRouter.patch('/:id', asyncHandler(updatedUserById))
userRouter.delete('/:id', asyncHandler(deleteUserById))

export default userRouter;