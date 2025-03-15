// /components/DualRangeSlider.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

// Custom dual-handle slider component with improved UI.
// It accepts min, max, current values (an array [minValue, maxValue]), and an onChange callback.
const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  // Convert a value into a percentage for slider positioning.
  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Initiate dragging for the specified handle.
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
      // Prevent left handle from crossing the right handle.
      if (newValue > newValues[1]) newValue = newValues[1];
      newValues[0] = newValue;
    } else {
      // Prevent right handle from going below the left handle.
      if (newValue < newValues[0]) newValue = newValues[0];
      newValues[1] = newValue;
    }
    onChange(newValues);
  };

  // Attach mousemove and mouseup listeners.
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
      className="relative h-4 bg-gray-200 rounded-full"
      style={{ margin: "0 15px" }}
    >
      {/* Active track */}
      <div
        className="absolute h-4 bg-blue-500 rounded-full"
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
        className="absolute h-6 w-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[0])}% - 12px)`,
          top: "-1px",
        }}
      ></div>
      {/* Right handle */}
      <div
        onMouseDown={handleMouseDown(1)}
        className="absolute h-6 w-6 bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[1])}% - 12px)`,
          top: "-1px",
        }}
      ></div>
    </div>
  );
};

export default DualRangeSlider;
