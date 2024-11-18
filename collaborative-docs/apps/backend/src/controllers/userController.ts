import { Request, Response } from "express";
import { fetchAllUsers, createUser, fetchUserById, updatedUser, deleteUser } from '../services/user.services'

export async function getAllUsers(req: Request, res: Response) {
  try {
    const{ code, message, details} = await fetchAllUsers();

    return res.status(code).json({message, details})
    
  } catch (error: any) {
      return res.status(500).json({message: "Something wrong happened", details: error.toString()})
   
  }
}

export async function fetchById(req: Request, res: Response){
  try {
    const {code, message, details } = await fetchUserById(Number(req.params.id))

    return res.status(code).json({message, details})
    
  } catch (error: any) {
    return res.status(500).json({message: "Something wrong happened", details: error.toString()})
    
  }
}

export async function updatedUserById(req: Request, res: Response) {
  try{
    const { name, email, password } = req.body;
    const { code, message, details } = await updatedUser(name, email, password, Number(req.params.id))

    return res.status(code).json({message, details})
  }catch (error: any){
    return res.status(500).json({message: "Something wrong happened", details: error.toString()})
  }
  
}

export async function postUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { code, message, details } = await createUser(name, email, password);

    return res.status(code).json({message, details})
  } catch (error: any) {
    return res.status(500).json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function deleteUserById(req: Request, res:Response){
  try {
    const { code, message, details } = await deleteUser(Number(req.params.id))
    return res.status(code).json({ message, details})
  } catch (error: any) {
    return res.status(500).json({ message: "Something wrong happened", details: error.toString() });
  }
}
