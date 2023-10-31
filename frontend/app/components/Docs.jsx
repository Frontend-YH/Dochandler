import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faEdit, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function formatDateTime(dateTimeString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  const date = new Date(dateTimeString);
  return date.toLocaleString('sv-SE', options);
}

const MyDocs = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.docTitle || '');
  const [editedContent, setEditedContent] = useState(props.docContent || '');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.onSave(editedTitle, editedContent);
    setIsEditing(false);
  };

  const handleToggleClick = () => {
    props.onToggle();
  };

  return (
    <div className="w-full md:w-9/12 mb-8 p-5 border rounded-md border-slate-300 hover:border-slate-400">
      <FontAwesomeIcon icon={faFile} size="xs" className="w-5" />
      <div className="flex flex-col md:flex-row items-center gap-4">
        {isEditing ? (
          <div className="flex flex-col w-full">
            {{/* Lägg till textarea istället för input */}}
            <input
              className="w-full mb-2 p-2 border border-slate-700 rounded"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            />
            <input
              className="w-full h-80 mb-2 p-2 border border-slate-700 rounded"
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
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
            <p>{props.isExpanded ? editedContent : ''}</p>
          </div>
        )}
        <p className="text-sm">{formatDateTime(props.createDate)}</p> 
        <button onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} size="xs" className="w-5" />
        </button>
        <button
          onClick={handleToggleClick}
          className={`flex w-40 place-content-around text-blue-500 hover:text-blue-700 py-2 px-4 border border-blue-700 rounded ${props.isExpanded ? 'text-open-eye' : 'text-closed-eye'}`}
        >
          {props.isExpanded ? (
            <FontAwesomeIcon icon={faEye} size="xs" className="w-5" />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} size="xs" className="w-5" />
          )}
        </button>
        <button
          onClick={() => props.onDelete()}
          className="flex w-40 place-content-around bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyDocs;
