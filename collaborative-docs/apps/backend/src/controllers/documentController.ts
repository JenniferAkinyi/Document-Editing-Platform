import { Request, Response } from "express";
import { getAllDocuments } from "../services/document.services";
import { createNewDocument } from "../services/document.services";
import { fetchDocumentById } from "../services/document.services";
import { updateDocument } from "../services/document.services";
import { deleteDocumentById } from "../services/document.services";

export async function getDocuments(req: Request, res: Response ){
    try {
        const {code, message, details } = await getAllDocuments();

        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})  
    }
}

export async function fetchIdDoc(req: Request, res: Response){
    try {
        const { code, message, details } = await fetchDocumentById(Number(req.params.id))

        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something bad happened", details: error. toString()})
    }
}

export async function updateDoc(req: Request, res: Response){
    try {
        const { title, content, ownerId } = req.body
        const { code, message, details } = await updateDocument(title, content, ownerId, Number(req.params.id))

        return res.status(code).json({message, details})
    } catch( error: any){
        return res.status(500).json({message: "Something bad happened", details: error. toString()})
    }
}

export async function createDocument(req: Request, res: Response){
    try {
        const { title, content, ownerId} = req.body;
        const { code, message, details } = await createNewDocument(title, content, ownerId);
        
        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}

export async function deleteDocument(req: Request, res: Response){
    try {
        const { code, message, details } = await deleteDocumentById(Number(req.params.id));

        return res.status(code).json({message, details})
    } catch (error: any) {
        return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    }
}


