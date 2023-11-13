"use client";
import React, { useState, useEffect } from "react";
import MyDocs from "./Docs";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextEditor from "./Editor";
import Switch from "./Switch";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [expandedDocs, setExpandedDocs] = useState([]);
  const [docPrivate, setPrivate] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const jsonString = localStorage.getItem("userID");
  const user = JSON.parse(jsonString) || {};

  const fetchData = async () => {
    try {
      const postsResult = await fetch("/api/docs");
      const postsFromApi = await postsResult.json();

      const favoritesResult = await fetch("/api/favorites");
      const favorites = await favoritesResult.json();

      const favoritesMap = {};
      const userFavorites = favorites.filter(
        (fav) => fav.user_id === user.user_id
      );

      userFavorites.forEach((fav) => {
        favoritesMap[fav.doc_id] = true;
      });

      const nonDeletedPost = postsFromApi.filter((post) => !post.isDeleted);
      const reversedNonDeletedPosts = [...nonDeletedPost].reverse();

      const sortedPosts = reversedNonDeletedPosts.sort((a, b) => {
        const aIsFavorite = favoritesMap[a.id] || false;
        const bIsFavorite = favoritesMap[b.id] || false;

        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;

        const dateA = new Date(a.createDate).getTime();
        const dateB = new Date(b.createDate).getTime();

        return dateB - dateA;
      });

      setPosts(sortedPosts);
      setIsFavorite(favoritesMap);
    } catch (error) {
      console.error("Något gick fel vid hämtning av data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user.user_id]);

  const filterPosts = () => {
    return posts.filter((post) => {
      if (user.user_id === post.user_id || !post.isPrivate) {
        return true;
      }
      return post.isPrivate && user.user_id === post.user_id;
    });
  };

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
    setTitleError("");
    setContentError("");
    try {
      const data = {
        user_id: user.user_id,
        username: user.username,
        title,
        content,
        docPrivate: docPrivate ? 1 : 0,
      };

      if (!data.title) {
        setTitleError("Title is required");
        return;
      }

      if (!data.content || data.content.trim() === "<p><br></p>") {
        setContentError("Content is required");
        return;
      }

      console.log(data, "här");
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
        fetchData();
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
        fetchData();
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
        fetchData();
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
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              />
              {titleError && <p className="text-red-600">{titleError}</p>}

              <TextEditor onChange={handleContentChange} value={content} />
              
              {contentError && <p className="text-red-600">{contentError}</p>}

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
            <>
              <button
                className="w-full bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddNewDoc}
              >
                <FontAwesomeIcon icon={faPlus} size="xs" className="w-5" />
                <p className="font-light">Add new doc</p>
              </button>
              <SearchBar posts={posts} setPosts={setPosts} />
              <Dropdown />
            </>
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
          filterPosts().map((post, index) => (
            <MyDocs
              key={post.id}
              username={post.username}
              docTitle={post.docTitle}
              docContent={post.docContent}
              createDate={post.createDate}
              post={post.id}
              onDelete={() => handleDelete(post.id)}
              isPrivate={post.isPrivate}
              onSave={(updatedTitle, updatedContent, docPrivate) =>
                handleSave(post.id, updatedTitle, updatedContent, docPrivate)
              }
              onToggle={() => handleToggleDoc(post.id)}
              isExpanded={expandedDocs.includes(post.id)}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              favorite={isFavorite[post.id] ? true : false}
              localUserId={user.user_id}
              dbUser={post.user_id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MainPage;
