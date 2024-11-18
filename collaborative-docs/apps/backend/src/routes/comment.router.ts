import { Router } from "express";
import { asyncHandler } from "../utils/handler";
import { getComments } from "../controllers/commentController";
import { postComments } from "../controllers/commentController";
import { getIdComment } from "../controllers/commentController";
import { updateComment } from "../controllers/commentController";
import { deleteComment } from "../controllers/commentController";

import { postThread } from "../controllers/commentController";
import { fetchThreadId } from "../controllers/commentController";

const commentRouter = Router()

commentRouter.get('/', asyncHandler(getComments))
commentRouter.post('/', asyncHandler(postComments))
commentRouter.get('/:id', asyncHandler(getIdComment))
commentRouter.patch("/:id", asyncHandler(updateComment))
commentRouter.delete("/:id", asyncHandler(deleteComment))

commentRouter.post('/:id', asyncHandler(postThread))
commentRouter.get('/:id', asyncHandler(fetchThreadId))

export default commentRouter;