import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  fetchAllUsers,
  createUser,
  fetchUserById,
  updatedUser,
  deleteUser,
  loginUserService
} from "../services/user.services";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { code, message, token, details } = await loginUserService(email, password);

    // Handle response based on service results
    if (code === 200) {
      res.cookie("token-Cookie", token, { httpOnly: true, signed: true });
    }

    return res.status(code).json({ message, details, token });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const { code, message, details } = await fetchAllUsers();

    return res.status(code).json({ message, details });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function fetchById(req: Request, res: Response) {
  try {
    const { code, message, details } = await fetchUserById(
      Number(req.params.id)
    );

    return res.status(code).json({ message, details });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function updatedUserById(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { code, message, details } = await updatedUser(
      name,
      email,
      password,
      Number(req.params.id)
    );

    return res.status(code).json({ message, details });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}

export async function postUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { code, message, details } = await createUser(
      name,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const { code, message, details } = await deleteUser(Number(req.params.id));
    return res.status(code).json({ message, details });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong happened", details: error.toString() });
  }
}
