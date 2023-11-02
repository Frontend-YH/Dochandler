import React, { useState } from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
    const [value, setValue] = useState(isOn ? 1 : 0);
  
    const toggleSwitch = () => {
      const newValue = value === 1 ? 0 : 1;
      setValue(newValue);
      handleToggle();
    };
  
    return (
      <>
        <input
          checked={value === 1}
          onChange={toggleSwitch}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className="react-switch-label"
          style={{ background: value === 1 && '#06D6A0' }}
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
        <p>{value ? "Privat" : "Publikt"}</p>
      </>
    );
  };
  
  
  export default Switch;