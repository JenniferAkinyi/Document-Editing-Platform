import React, { useState } from 'react';
import plus from '../../../assets/images/plus.png';
import './Taskboard.css';
import Docs from '../../Document/Docs';
import EditDocs from '../../Edits/EditDocs';



const Taskboard: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null); // To hold the document being edited

  const handleNewDocument = () => {
    setCurrentDocument(null); // Set to null for creating a new document
    setIsEdit(true); // Open the editor
  };

  const handleEdit = (document: any) => {
    setCurrentDocument(document); // Set the document being edited
    setIsEdit(true); // Open the editor
  };

  const closeEditor = () => {
    setIsEdit(false); // Close the editor
  };

  if (isEdit) {
    return (
      <EditDocs
        handleEdit={closeEditor}
        document={currentDocument} // Pass the current document or null for new
      />
    );
  }

  return (
    <section>
      <div className="new-document">
        <p>Start New Document</p>
        <div className="document-card">
          <img src={plus} alt="plus-icon" onClick={handleNewDocument} />
        </div>
        <p className="blank">Blank Document</p>
      </div>
      <div className="documents">
        <Docs onEdit={handleEdit} /> {/* Pass the edit handler to Docs */}
      </div>
    </section>
  );
};

export default Taskboard;
