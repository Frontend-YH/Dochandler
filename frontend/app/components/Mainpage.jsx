"use client"
import React, { useState, useEffect } from "react";
import MyDocs from "./Docs";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [expandedDocs, setExpandedDocs] = useState([]); 

  const getPosts = async () => {
    try {
      const result = await fetch("/api/docs");
      const postsFromApi = await result.json();
      setPosts(postsFromApi);
    } catch (error) {
      console.error('Något gick fel vid hämtning av data:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleAddNewDoc = () => {
    setShowInputs(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveDoc = async () => {
    try {
      const response = await fetch("/api/docs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setShowInputs(false);
        getPosts();
      } else {
        console.error("Något gick fel vid POST-förfrågan");
      }
    } catch (error) {
      console.error("Något gick fel vid POST-förfrågan:", error);
    }
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch("/api/docs/" + post, {
        method: "DELETE",
      });

      if (response.ok) {
        getPosts();
      } else {
        console.error("Något gick fel vid radering av dokumentet.");
      }
    } catch (error) {
      console.error("Något gick fel vid radering av dokumentet:", error);
    }
  };

  const handleSave = async (post, updatedTitle, updatedContent) => {
    try {
      const response = await fetch("/api/docs/" + post, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedTitle, updatedContent }),
      });

      if (response.ok) {
        getPosts();
      } else {
        console.error("Något gick fel vid PATCH-förfrågan.");
      }
    } catch (error) {
      console.error("Något gick fel vid PATCH-förfrågan:", error);
    }
  };

  const handleToggleDoc = (docId) => {
    setExpandedDocs((prevExpandedDocs) =>
      prevExpandedDocs.includes(docId)
        ? prevExpandedDocs.filter((id) => id !== docId)
        : [...prevExpandedDocs, docId]
    );
  };

  return (
    <>
      <Header />
      <div className="w-screen flex flex-col items-center">
        <div className="m-4">
          {showInputs ? (
            <div className="flex flex-col w-full h-full items-center">
              <input
                type="text"
                placeholder="Document Title"
                value={title}
                onChange={handleTitleChange}
                className="w-full mb-4 p-2 rounded border"
                style={{
                  writingMode: 'vertical-rl',  
                  textOrientation: 'mixed',      
                }}
              />
              <input
                type="text"
                placeholder="Document Content"
                value={content}
                onChange={handleContentChange}
                className="w-full h-40 mb-4 p-2 rounded border"
                style={{
                  writingMode: 'vertical-rl',   
                  textOrientation: 'mixed',      
                }}
              />
              <button
                className="w-full bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveDoc}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddNewDoc}
            >
              <FontAwesomeIcon icon={faPlus} size="xs" className="w-5" />
              <p className="font-light">Add new doc</p>
            </button>
          )}
        </div>
        {showInputs ? null : (
          posts.map((post) => (
            <MyDocs
              key={post.id}
              docTitle={post.docTitle}
              docContent={post.docContent}
              createDate={post.createDate}
              post={post.id}
              onDelete={() => handleDelete(post.id)}
              onSave={(updatedTitle, updatedContent) =>
                handleSave(post.id, updatedTitle, updatedContent)
              }
              onToggle={() => handleToggleDoc(post.id)}
              isExpanded={expandedDocs.includes(post.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MainPage;