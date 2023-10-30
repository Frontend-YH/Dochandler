"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import BundledEditor from "../BundledEditor";
import { DocContext } from "./DocContext";
import { Editor } from "tinymce";

export default function TextEditor() {
  const router = useRouter();
  const { dataValues, setDataValues } = useContext(DocContext);

  const editorRef = useRef<Editor | null>(null);

  const saveDocument = async () => {
    if (editorRef.current) { 
      let fontRef = editorRef.current.selection.getNode().style.color.toString();
      let bgRef = editorRef.current.selection.getNode().style.backgroundColor.toString();
      let textRef = editorRef.current.getContent();
  
      const updatedDataValues = {
        ...dataValues,
        text_field: textRef,
      };
  
      try {
        const options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatedDataValues,
            text_color: fontRef,
            bg_color: bgRef,
            date: "",
          }),
        };
        const response = await fetch("http://localhost:3000/api/doctext", options);
  
        if (response.ok) {
          const updatedData = await response.json();
          setDataValues(updatedData); 
          router.refresh();
        } else {
          console.error("Failed to save document:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      console.error("editorRef.current is null. Make sure the ref is properly initialized.");
    }
  };

  return (
    <>
      <BundledEditor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={
          dataValues.text_field !== undefined
            ? dataValues.text_field
            : "Text Saved !"
        }
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor fontsize" +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button
        className=" border-2 bg-inherit bg-slate-700 text-white p-2 mt-2"
        onClick={saveDocument}
      >
        Save Text
      </button>
    </>
  );
}
