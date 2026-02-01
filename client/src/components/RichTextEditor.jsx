import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <ReactQuill
        theme="snow"
        value={input.description}
        onChange={handleChange}
        placeholder="Write your course description here..."
        className="custom-quill-editor"
      />
    </div>
  );
};

export default RichTextEditor;
