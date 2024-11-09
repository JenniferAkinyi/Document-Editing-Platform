import prisma from "../config/db";

// get all documents
export async function getAllDocuments() {
  try {
    const documents = await prisma.documents.findMany();

    if (documents.length === 0) {
      return {
        code: 400,
        message: "Error fetching documents",
        details: "documents not found",
      };
    }
    return {
      code: 200,
      message: "Documents fetched successfully",
      details: documents,
    };
  } catch (error: any) {
    return {
      code: 500,
      message: "Error fetching users",
      details: error.toString(),
    };
  }
}

// fetch document by the document id
export async function fetchDocumentById(id: number){
    try {
        const document = await prisma.documents.findUnique({
            where: {
                id: id
            }
        })
        if(!document){
            return{
                code: 400,
                message: "Document not found",
                details: `No user found in ${id}`
            }
        }
        return{
            code: 200,
            message: "Document founfd successfully",
            details: document
        }
    } catch (error: any) {
        return{
            code: 500,
            message: "Error fetching document",
            details: error.toString()
        }
    }
}

// update a specifuc detail in the document
export async function updateDocument(title: string, content: string, ownerId: number, id: number){
    try {
        const document = await prisma.documents.update({
            where: {
                id: id
            },
            data: {
                title,
                content,
                ownerId
            }
        })
        return{
            code: 200,
            message: "Document Updated Successfully",
            details: document
        }
    } catch (error: any) {
        return{
            code: 500,
            message: "Error updating document",
            details: error.toString()
        }
        
    }

}
// add a document to the db
export async function createNewDocument(
  title: string,
  content: string,
  ownerId: number
) {
  try {
    const document = await prisma.documents.create({
      data: {
        title,
        content,
        ownerId,
      },
    });

    return{
        code: 200,
        message: "Document created successfully",
        details: {
           title: document.title,
           content: document.content,
           ownerId: document.ownerId 
        }
    }
  } catch (error: any) {
    return{
        code: 400,
        message: "Error posting document",
        details: error.toString()
    }
  }
}
// delete a document
export async function deleteDocumentById(id: number){
    try {
        const existingDocument = await prisma.users.findUnique({
            where: {
              id: id,
            },
          });
          if (!existingDocument) {
            return {
              code: 400,
              message: "Document not found",
              details: `No document found with id ${id}`,
            };
          }
        const document = await prisma.documents.delete({
            where: {
                id: id
            }
        })
        return{
            code: 200,
            message: "Document deleted successfully",
            details: document
        }
    } catch (error: any) {
        return{
            code: 500,
            message: "Error deleting document",
            details: error.toString()
        }
        
    }
}