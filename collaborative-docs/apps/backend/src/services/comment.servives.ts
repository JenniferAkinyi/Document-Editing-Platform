import prisma from "../config/db";

// get all the comment posted
export async function getAllComments() {
  try {
    const comments = await prisma.comments.findMany();

    if (comments.length === 0) {
      return {
        code: 400,
        message: "Error fetching comments",
        details: "No messages found",
      };
    }
    return {
      code: 200,
      message: "Comments fetched successfully",
      details: comments,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching comments",
      details: error.toString(),
    };
  }
}

// get comment by a specific id
export async function getCommentById(id: number){
    try {
        const comments = await prisma.comments.findUnique({
            where: {
                id: id
            }
        })
        if(!comments){
            return{
                code: 400,
                message: "Comments not found",
                details: `No comment found in id ${id}`
            }
        }
        return{
            code: 200,
            message: "Comment found successfully",
            details: comments
        }
    } catch (error: any) {
        return{
            code: 500,
            message: "Error fetching comments",
            details: error.toString()
        }
    }
}

//  post a comment 
export async function postCommentById(
    content: string,
    documentId: number,
    ownerId: number,
) {
    try {
        const comments = await prisma.comments.create({
            data: {
                content,
                documentId,
                ownerId
            },
        })
        return{
            code: 200,
            message: "Comment posted successfully",
            details: comments
        }
    } catch (error: any) {
        return{
            code: 400,
            message: "Error posting document",
            detaols: error.toString()
        }
        
    }
}