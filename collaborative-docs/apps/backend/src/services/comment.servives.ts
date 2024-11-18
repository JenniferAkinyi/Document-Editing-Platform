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
export async function getCommentById(id: number) {
  try {
    const comments = await prisma.comments.findUnique({
      where: {
        id: id,
      },
    });
    if (!comments) {
      return {
        code: 400,
        message: "Comments not found",
        details: `No comment found in id ${id}`,
      };
    }
    return {
      code: 200,
      message: "Comment found successfully",
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

// update a specific comment
export async function updateCommentById(
  content: string,
  documentId: number,
  ownerId: number,
  id: number
) {
  try {
    const comments = await prisma.comments.update({
      where: {
        id: id,
      },
      data: {
        content,
        documentId,
        ownerId,
      },
    });
    return {
      code: 200,
      message: "Comment updated successfully",
      details: comments,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error updating comment",
      details: error.toString(),
    };
  }
}

//  post a comment
export async function postCommentById(
  content: string,
  documentId: number,
  ownerId: number
) {
  try {
    const comments = await prisma.comments.create({
      data: {
        content,
        documentId,
        ownerId,
      },
    });
    return {
      code: 200,
      message: "Comment posted successfully",
      details: comments,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error posting document",
      detaols: error.toString(),
    };
  }
}

// deleting a comment
export async function deleteCommentById(id: number) {
  try {
    const comments = await prisma.comments.delete({
      where: {
        id: id,
      },
    });
    if (!comments) {
      return {
        code: 400,
        message: "Comment not found",
        details: `No comment found with id ${id}`,
      };
    }
    return {
      code: 200,
      message: "Comment deleted successfully",
      details: comments,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error deleting comment",
      details: error.toString(),
    };
  }
}

// NOW to the threaded comments

// fetching the threaded comments
export async function fetchThreadedCommentById(id: number){
    try {
        const comments = await prisma.comments.findUnique({
            where: {
                id: id
            }
        })
    if(!comments){
        return {
            code: 400,
            message: "No threaded comment found",
            details: `No threaded comment under id ${id}`
        }
    }
    return {
        code: 200,
        message: "Comment fetched successfully",
        details: comments
    }
    } catch (error: any) {
        return {
            code: 400,
            message: "Error fetching comment",
            details: error.toString()
        }  
    }
}

// posting the threaded comment
export async function postThreadedComment(
  content: string,
  documentId: number,
  ownerId: number,
  parentId?: number
) {
  try {
    const comments = await prisma.comments.create({
      data: {
        content,
        documentId,
        ownerId,
        parentId: parentId ? parentId : null 
      },
      include: {
        replies: true,
      },
    });
    return {
      code: 200,
      message: "Comment posted successfully",
      details: comments,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error posting comment",
      details: error.toString()
    };
  }
}
