import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faEdit,
  faEye,
  faEyeSlash,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import TextEditor from "./Editor";
import ReactQuill from "react-quill";
import Switch from "./Switch";

function formatDateTime(dateTimeString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateTimeString);
  return date.toLocaleString("sv-SE", options);
}
const MyDocs = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.docTitle || "");
  const [editedContent, setEditedContent] = useState(props.docContent || "");
  const [docPrivate, setPrivate] = useState(false);
  const jsonString = localStorage.getItem("userID");
  const user = JSON.parse(jsonString);
  const canEdit = props.localUserId === props.dbUser;
  const handleEditClick = () => {
    console.log(canEdit, "Can edit");
    if (canEdit) {
      setIsEditing(true);
    } else {
      alert("Du har inte behörighet att redigera detta inlägg.");
    }
  };

  const handleSaveClick = () => {
    props.onSave(editedTitle, editedContent, docPrivate);
    setIsEditing(false);
  };

  const handleToggleClick = () => {
    props.onToggle();
  };
  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: user.user_id,
        doc_id: props.post,
      };
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        props.setIsFavorite((prevFavorites) => ({
          ...prevFavorites,
          [props.post]: !prevFavorites[props.post],
        }));
        window.location.reload();
      } else {
        console.error("Something went wrong when adding to favorites.");
      }
    } catch (error) {
      console.error("Something went wrong when adding to favorites:", error);
    }
  };

  return (
    <div className="w-full md:w-9/12 mb-8 p-5 border rounded-md border-slate-300 hover:border-slate-400">
      <FontAwesomeIcon icon={faFile} size="xs" className="w-5" />
      <div className="flex flex-col md:flex-row items-center gap-4">
        {isEditing ? (
          <div className="flex flex-col w-full">
            <input
              className="w-full mb-2 p-2 border border-slate-700 rounded"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextEditor
              value={editedContent}
              onChange={(e) => setEditedContent(e)}
            />
            <Switch
              isOn={props.isPrivate}
              handleToggle={() => setPrivate(!props.isPrivate)}
            />
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{editedTitle}</h2>
            <div>
              {props.isExpanded ? (
                <ReactQuill
                  theme="bubble"
                  value={editedContent || ""}
                  readOnly={true}
                  className="text-black"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        )}
        <p className="text-sm">{formatDateTime(props.createDate)}</p>

        {canEdit ? (
          <button onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} size="xs" className="w-5" />
          </button>
        ) : (
          ""
        )}
        <button
          onClick={handleToggleClick}
          className={`flex w-40 place-content-around text-blue-500 hover:text-blue-700 py-2 px-4 border border-blue-700 rounded ${
            props.isExpanded ? "text-open-eye" : "text-closed-eye"
          }`}
        >
          {props.isExpanded ? (
            <FontAwesomeIcon icon={faEye} size="xs" className="w-5" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} size="xs" className="w-5" />
          )}
        </button>
        <p>
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          {props.username}
        </p>
        <button onClick={handleToggleFavorite}>
          {props.favorite ? (
            <FontAwesomeIcon icon={faStar} color="gold" />
          ) : (
            <FontAwesomeIcon icon={faStar} />
          )}
        </button>
        {canEdit ? (
          <button
            onClick={() => props.onDelete()}
            className="flex w-40 place-content-around bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyDocs;
