// /components/DualRangeSlider.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

// A custom dual-handle slider with a modern, attractive UI.
// It accepts a min, max, current values ([minValue, maxValue]), and an onChange callback.
const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  // Convert a value to a percentage for positioning.
  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Start dragging the specified handle.
  const handleMouseDown = (handleIndex) => (e) => {
    setDragging(handleIndex);
    e.preventDefault();
  };

  // Stop dragging.
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Update handle position based on mouse movement.
  const handleMouseMove = (e) => {
    if (dragging === null) return;
    if (!sliderRef.current) return;
    const sliderRect = sliderRef.current.getBoundingClientRect();
    let newPercent = (e.clientX - sliderRect.left) / sliderRect.width;
    newPercent = Math.min(Math.max(newPercent, 0), 1);
    let newValue = Math.round(min + newPercent * (max - min));
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
      className="relative h-6 bg-gray-100 rounded-full shadow-inner"
      style={{ margin: "0 15px" }}
    >
      {/* Active track with gradient */}
      <div
        className="absolute h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-md"
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
        className="absolute h-8 w-8 bg-white border-2 border-blue-600 rounded-full cursor-pointer transition-transform transform hover:scale-125 shadow-lg"
        style={{
          left: `calc(${getPosition(values[0])}% - 16px)`,
          top: "-1px",
        }}
      ></div>
      {/* Right handle */}
      <div
        onMouseDown={handleMouseDown(1)}
        className="absolute h-8 w-8 bg-white border-2 border-blue-600 rounded-full cursor-pointer transition-transform transform hover:scale-125 shadow-lg"
        style={{
          left: `calc(${getPosition(values[1])}% - 16px)`,
          top: "-1px",
        }}
      ></div>
    </div>
  );
};

export default DualRangeSlider;
