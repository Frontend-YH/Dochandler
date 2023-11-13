import React from 'react';

const Dropdown = ({ onDropChange }) => {
  const handleDropChange = (e) => {
    onDropChange(e.target.value);
  };

  return (
    <div className="w-72">
      <select className="border rounded p-2" onChange={handleDropChange}>
        <option value="all">Alla inlägg</option>
        <option value="mine">Mina inlägg</option>
        <option value="favorite">Favorite inlägg</option>
      </select>
    </div>
  );
};

export default Dropdown;
