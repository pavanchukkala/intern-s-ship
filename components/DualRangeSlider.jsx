// /components/DualRangeSlider.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  // Convert a value to its relative percentage position
  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Initiate dragging for a specific handle
  const handleMouseDown = (handleIndex) => (e) => {
    setDragging(handleIndex);
    e.preventDefault();
  };

  // End dragging
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Update handle positions on mouse move
  const handleMouseMove = (e) => {
    if (dragging === null) return;
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(percent, 1));
    let newValue = Math.round(min + percent * (max - min));
    const newValues = [...values];
    if (dragging === 0) {
      if (newValue > newValues[1]) newValue = newValues[1];
      newValues[0] = newValue;
    } else {
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
      className="relative h-3 bg-gray-300 rounded-full"
      style={{ margin: "0 15px" }}
    >
      {/* Active track with a subtle gradient and shadow */}
      <div
        className="absolute h-3 rounded-full"
        style={{
          left: `${getPosition(values[0])}%`,
          width: `${getPosition(values[1]) - getPosition(values[0])}%`,
          background: "linear-gradient(to right, #3b82f6, #2563eb)",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.4)",
        }}
      ></div>
      {/* Left handle with refined styling */}
      <div
        onMouseDown={handleMouseDown(0)}
        className="absolute h-6 w-6 bg-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[0])}% - 12px)`,
          top: "-1.5px",
          border: "2px solid #2563eb",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      ></div>
      {/* Right handle with similar refined styling */}
      <div
        onMouseDown={handleMouseDown(1)}
        className="absolute h-6 w-6 bg-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[1])}% - 12px)`,
          top: "-1.5px",
          border: "2px solid #2563eb",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      ></div>
    </div>
  );
};

export default DualRangeSlider;
