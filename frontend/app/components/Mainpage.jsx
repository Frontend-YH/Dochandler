"use client"
import React, { useState, useEffect } from "react";
import MyDocs from "./Docs";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextEditor from "./Editor";
import Switch from "./Switch";


const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [expandedDocs, setExpandedDocs] = useState([]); 
  const [docPrivate, setPrivate] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});
const jsonString = localStorage.getItem('userID');
const user = JSON.parse(jsonString) || {};

  const getPosts = async () => {
    try {
      const result = await fetch("/api/docs");
      const postsFromApi = await result.json();
      const reversedPosts = [...postsFromApi].reverse();
      setPosts(reversedPosts);
      
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
    setContent(e);
  };

  
  const handleSaveDoc = async () => {
    try {
      const data = {
        user_id: user.user_id,
        username: user.username,
        title, 
        content, 
        docPrivate: docPrivate ? 1 : 0, 
      };
      console.log(data,"här")
      const response = await fetch("/api/docs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setTitle("");
        setContent("");
        setPrivate(false); 
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

  const handleSave = async (post, updatedTitle, updatedContent, docPrivate) => {
    try {
      const response = await fetch("/api/docs/" + post, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedTitle,
          updatedContent,
          docPrivate: docPrivate ? 1 : 0, 
        }),
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


  /* get favorites */

  useEffect(() => {
    const getFavorites = async () => {
      const res = await fetch("/api/favorites");
      const favorites = await res.json();
      const favoritesMap = {};
     const userFavorites=favorites.filter(fav=>{
      return fav.user_id === user.user_id

     })
     console.log(user)
      userFavorites.forEach((fav) => {
        favoritesMap[fav.doc_id] = true;
      });

      setIsFavorite(favoritesMap);
    };

    getFavorites();
  }, []);

  

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
              <TextEditor onChange={handleContentChange} value={content} />

              <Switch
              isOn={docPrivate}
              handleToggle={() => setPrivate(!docPrivate)}
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
        {showInputs ? null : posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold">Det finns inga inlägg....</h2>
              <p>Tryck på "Add new doc" för att lägga till inlägg.</p>
            </div>
          </div>
        ) : (
          posts.map((post,index) => (
            <MyDocs
              key={post.id}
              username={post.username}
              docTitle={post.docTitle}
              docContent={post.docContent}
              createDate={post.createDate}
              post={post.id}
              onDelete={() => handleDelete(post.id)}
              onSave={(updatedTitle, updatedContent, docPrivate) =>
                handleSave(post.id, updatedTitle, updatedContent, docPrivate)
              }
              onToggle={() => handleToggleDoc(post.id)}
              isExpanded={expandedDocs.includes(post.id)}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              favorite={isFavorite[post.id] ? true : false}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MainPage;