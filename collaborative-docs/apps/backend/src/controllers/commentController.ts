import { Request, Response } from "express";
import { getAllComments } from "../services/comment.servives";
import { postCommentById } from "../services/comment.servives";
import { getCommentById } from "../services/comment.servives";
import { updateCommentById } from "../services/comment.servives";
import { deleteCommentById } from "../services/comment.servives";
import { postThreadedComment } from "../services/comment.servives";
import { fetchThreadedCommentById } from "../services/comment.servives";

export async function getComments( req: Request, res: Response){
    try {
        const {code, message, details } = await getAllComments();

        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

export async function getIdComment( req: Request, res: Response ){
    try {
        const { code, message, details } = await getCommentById(Number(req.params.id))

        return res.status(code).json({ message, details})
    } catch ( error: any ) {
        return res.status(500).json({ message: "Something wrong happened", details: error.toString()})
    }
}

export  async function updateComment(req: Request, res: Response ){
    try {
        const { content, documentId, ownerId } = req.body
        const { code, message, details } = await updateCommentById(content, documentId, ownerId, Number(req.params.id) )

        return res.status(code).json({ message, details })
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

export async function postComments( req: Request, res: Response){
    try {
        const { content, documentId, ownerId } = req.body
        const { code, message, details } = await postCommentById(content, documentId, ownerId);

        return res.status(code).json({message, details})
    } catch ( error: any ){
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

export async function deleteComment(req: Request, res: Response){
    try {
        const { code, message, details } = await deleteCommentById(Number(req.params.id))

        return res.status(code).json({ message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

// threaded comment and its operations

export async function fetchThreadId(req: Request, res: Response){
    try {
        const { code, message, details } = await fetchThreadedCommentById(Number(req.params.id))

        return res.status(code).json({ message, details })
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

export async function postThread(req: Request, res: Response){
    try {
        const { content, documentId, ownerId, parentId } = req.body as { content: string, documentId: number, ownerId: number, parentId?: number }
        const { code, message, details } = await postThreadedComment( content, documentId, ownerId, parentId)

        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}