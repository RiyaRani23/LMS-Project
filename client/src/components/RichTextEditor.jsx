import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput }) => {
    
    const handleChange = (content) => {
        setInput({ ...input, description: content });
    };

    return (
        <div className="bg-white dark:bg-zinc-900">
            <ReactQuill 
                theme="snow" 
                value={input.description} 
                onChange={handleChange}    
                placeholder="Write your course description here..."
            />
        </div>
    );
}

export default RichTextEditor;