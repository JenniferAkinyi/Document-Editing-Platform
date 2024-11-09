import prisma from "../config/db";
import bcrypt from "bcrypt";

// getting all users
export async function fetchAllUsers() {
  try {
    const users = await prisma.users.findMany();

    if (users.length === 0) {
      return {
        code: 400,
        message: "Error fetching users",
        details: "users not found",
      };
    }
    return {
      code: 200,
      message: "Users fetched successfully",
      details: users,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching users",
      details: error.toString(),
    };
  }
}

// fetch a user by a specific id
export async function fetchUserById(id: number) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {
        code: 400,
        message: "User not found",
        details: `No user found with id ${id}`,
      };
    }
    return {
      code: 200,
      message: "User fetched successfully",
      details: user,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching user",
      details: error.toString(),
    };
  }
}

// update a user
export async function updatedUser(name: string, email: string, password: string, id: number) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      code: 200,
      message: "User updated successfully",
      details: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    };
  } catch (error: any) {
    return {
        code: 500,
        message: "Error updating user",
        details: error.toString(),
      };
  }
}

// creating a new user
export async function createUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return {
      code: 200,
      message: "User added successfully",
      details: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error creating user",
      details: error.toString(),
    };
  }
}

// deleting an existing user
export async function deleteUser(id: number){
    try {
        const existingUser = await prisma.users.findUnique({
            where: {
              id: id,
            },
          });
          if (!existingUser) {
            return {
              code: 400,
              message: "User not found",
              details: `No user found with id ${id}`,
            };
          }
        const user = await prisma.users.delete({
            where: {
                id: id
            }
        })
        return{
            code: 200,
            message: "User deleted successfully",
            details: user
        }
    } catch (error: any) {
        return {
            code: 500,
            message: "Error deleting users",
            details: error.toString()
        }
    }
}
