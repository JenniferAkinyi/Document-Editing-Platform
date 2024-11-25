import React, { useEffect, useState } from "react";
import TaskBoardAction from "../DashBoard/taskboard/TaskBoardAction";
import documentIcon from "../../assets/images/document.png";
import "./Docs.css";
import EditDocs from "../Edits/EditDocs";

interface Document {
  id: number;
  title: string;
  content: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  code: number;
  message: string;
  details: Document[];
}

interface DocsProps {
  onEdit: (document: Document) => void; // Handler for editing documents
}

const Docs: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleEdit = (doc: Document) => {
    setSelectedDocument(doc); // Store the selected document
    setIsEdit(true); // Switch to edit mode
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:4000/documents/");

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }
      const data: ApiResponse = await response.json();
      setDocuments(data.details || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (isEdit && selectedDocument) {
    return <EditDocs handleEdit={() => setIsEdit(false)} document={selectedDocument} />;
  }

  return (
    <div className="documents">
      <h2 className="documents-header">Recent Documents</h2>
      {loading && <p>Loading documents...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="documents-grid">
        {!loading && !error && documents.length === 0 && <p>No documents found.</p>}

        {Array.isArray(documents) &&
          documents.map((doc) => (
            <div key={doc.id} className="document-cards" onClick={() => handleEdit(doc)}>
              <div className="document-icon">
                <img src={documentIcon} alt="doc" />
              </div>
              <div className="document-details">
                <h4 className="document-title">{doc.title}</h4>
              </div>
              <div className="document-detailsrow">
                <p className="document-date">
                  {new Date(doc.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <TaskBoardAction />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Docs;
