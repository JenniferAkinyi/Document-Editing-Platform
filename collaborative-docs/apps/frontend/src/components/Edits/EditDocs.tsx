import React, { useRef, useEffect, useState } from "react";
import "./EditDocs.css";
import { GoArrowLeft } from "react-icons/go";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import io, { Socket } from "socket.io-client";

interface EditDocsProps {
  handleEdit: () => void;
}

const EditDocs: React.FC<EditDocsProps> = ({ handleEdit }) => {
  const [state, setState] = React.useState({ value: "" });
  const [socket, setSocket ] = useState<Socket | null>(null)
  const [quill, setQuill ] = useState<ReactQuill | null>(null)


  let quillRef = useRef<any>(null);

  useEffect(() => {
    quillRef.current.focus();
  }, []);

  const handleChange = (value: string) => {
    setState({ value });
  };

  useEffect(() => {
    const s = io('http://localhost:4000')
    setSocket(s)
    return () => {
      s.disconnect
    }
  }, [])

  useEffect(() => {
    if( socket == null || quill == null) return
    const handler = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user" ) return
      socket?.emit('send changes', delta)
    }
    quill.getEditor().on('text-change', handler)
    return() => {
      quill.getEditor().off('text-change', handler)
    }
  }, [socket, quill])

  return (
    <div className="edit-container">
      <GoArrowLeft onClick={handleEdit} size={25} className="react-icon" />
      <div className="quill-container">
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder=""
          ref={(el) => {
            quillRef.current = el;
            setQuill(el)
          }}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
};

export default EditDocs;
