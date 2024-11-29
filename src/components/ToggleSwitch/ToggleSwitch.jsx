// src/components/ToggleSwitch/ToggleSwitch.jsx
import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ toggleStations, toggleCars }) => {
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" onChange={toggleStations} defaultChecked />
        <span className="slider round"></span>
        <span className="label-text">Stations</span>
      </label>
      <label className="switch">
        <input type="checkbox" onChange={toggleCars} defaultChecked />
        <span className="slider round"></span>
        <span className="label-text">Cars</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
