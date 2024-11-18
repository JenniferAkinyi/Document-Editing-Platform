import React, { useRef, useEffect } from "react";
import './EditDocs.css'
import { GoArrowLeft } from "react-icons/go";
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar'
import 'react-quill/dist/quill.snow.css';


interface EditDocsProps {
  handleEdit: () => void;
}

const EditDocs: React.FC<EditDocsProps> = ({ handleEdit }) => {
    let quillRef = useRef<any>(null)

    useEffect(() => {
        quillRef.current.focus()
    }, [])

    const [state, setState] = React.useState({value: ''})
    const handleChange = (value: string) => {
        setState({ value })
    }

  return <div className="edit-container">
    <GoArrowLeft  onClick={handleEdit} size={30} className="react-icon"/>
    <div className="quill-container">
        <EditorToolbar />
        <ReactQuill 
            theme="snow" 
            value={state.value}   
            onChange={handleChange}
            placeholder="" 
            ref={quillRef}
            modules={modules}
            formats={formats}
        />
    </div>
  </div>;
};

export default EditDocs;
