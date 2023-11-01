import React, { useState } from 'react';
import  ReactQuill  from  "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function TextEditor(props) {
    const  modules  = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }], [{ 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['blockquote'],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }], ['link'],
          ],
    };
    
    const [editedContent, setEditedContent] = useState(props.textInput);
    const handleContentChange = (newContent) => {
      setEditedContent(newContent);

    };
      return (
        <ReactQuill
        modules={modules}
        theme="snow"
        placeholder={props.placeholder}
        value={editedContent}
        onChange={handleContentChange}
      />
      );
}
