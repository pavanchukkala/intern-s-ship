// /components/DualRangeSlider.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  // Convert a value into a percentage for positioning
  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Start dragging a handle
  const handleMouseDown = (handleIndex) => (e) => {
    setDragging(handleIndex);
    e.preventDefault();
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Update the handle positions on mouse move
  const handleMouseMove = (e) => {
    if (dragging === null) return;
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(percent, 1));
    let newValue = Math.round(min + percent * (max - min));
    const newValues = [...values];
    if (dragging === 0) {
      // Prevent left handle from exceeding right handle
      if (newValue > newValues[1]) newValue = newValues[1];
      newValues[0] = newValue;
    } else {
      // Prevent right handle from dropping below left handle
      if (newValue < newValues[0]) newValue = newValues[0];
      newValues[1] = newValue;
    }
    onChange(newValues);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, values]);

  return (
    <div
      ref={sliderRef}
      className="relative h-8 bg-gray-200 rounded-full"
      style={{ margin: "0 15px" }}
    >
      {/* Active track with modern gradient */}
      <div
        className="absolute h-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full transition-all shadow-lg"
        style={{
          left: `${getPosition(values[0])}%`,
          width: `${getPosition(values[1]) - getPosition(values[0])}%`,
          top: 0,
          bottom: 0,
        }}
      ></div>
      {/* Left handle */}
      <div
        onMouseDown={handleMouseDown(0)}
        className="absolute h-10 w-10 bg-white rounded-full border-2 border-white shadow-xl cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[0])}% - 20px)`,
          top: "-1px",
        }}
      ></div>
      {/* Right handle */}
      <div
        onMouseDown={handleMouseDown(1)}
        className="absolute h-10 w-10 bg-white rounded-full border-2 border-white shadow-xl cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[1])}% - 20px)`,
          top: "-1px",
        }}
      ></div>
    </div>
  );
};

export default DualRangeSlider;
