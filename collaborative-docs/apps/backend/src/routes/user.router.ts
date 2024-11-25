import { Router } from "express";
import { 
    getAllUsers,
    postUser,
    fetchById,
    updatedUserById,
    deleteUserById,
    loginUser,
   
} from "../controllers/userController";
import { asyncHandler } from "../utils/handler";
import { authenticateTokenMiddleware } from "../middlewares/authToken.middlewares";

const userRouter = Router();

userRouter.post('/login', asyncHandler(loginUser));
userRouter.get('/', asyncHandler(getAllUsers))
userRouter.post('/register', asyncHandler(postUser))
userRouter.get('/:id',authenticateTokenMiddleware, asyncHandler(fetchById))
userRouter.patch('/:id', asyncHandler(updatedUserById))
userRouter.delete('/:id', asyncHandler(deleteUserById))

export default userRouter;