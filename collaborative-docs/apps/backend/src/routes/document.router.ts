import { Router } from "express";
import { asyncHandler } from "../utils/handler";
import { getDocuments } from "../controllers/documentController";
import { createDocument } from "../controllers/documentController";
import { fetchIdDoc } from "../controllers/documentController";
import { updateDoc } from "../controllers/documentController";
import { deleteDocument } from "../controllers/documentController";

const documentRouter = Router()

documentRouter.get('/', asyncHandler(getDocuments))
documentRouter.post('/', asyncHandler(createDocument))
documentRouter.get('/:id', asyncHandler(fetchIdDoc))
documentRouter.patch('/:id', asyncHandler(updateDoc))
documentRouter.delete('/:id', asyncHandler(deleteDocument))

export default documentRouter;