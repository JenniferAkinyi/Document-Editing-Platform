import { Router } from "express";
import { asyncHandler } from "../utils/handler";
import { getComments } from "../controllers/commentController";
import { postComments } from "../controllers/commentController";
import { getIdComment } from "../controllers/commentController";

const commentRouter = Router()

commentRouter.get('/', asyncHandler(getComments))
commentRouter.post('/', asyncHandler(postComments))
commentRouter.get('/:id', asyncHandler(getIdComment))

export default commentRouter;