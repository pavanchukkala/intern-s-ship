"use client";
import React, { useState, useRef, useEffect } from "react";

const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Initiate dragging for a specific handle (mouse & touch)
  const handleStart = (handleIndex) => (e) => {
    setDragging(handleIndex);
    e.preventDefault();
  };

  const handleEnd = () => {
    setDragging(null);
  };

  // Handle move for both mouse and touch events.
  const handleMove = (clientX) => {
    if (dragging === null || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
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

  // Mouse events
  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  // Touch events
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, values]);

  return (
    <div
      ref={sliderRef}
      className="relative h-3 bg-gray-300 rounded-full mx-4"
    >
      <div
        className="absolute h-3 rounded-full"
        style={{
          left: `${getPosition(values[0])}%`,
          width: `${getPosition(values[1]) - getPosition(values[0])}%`,
          background: "linear-gradient(to right, #3b82f6, #2563eb)",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.4)",
        }}
      ></div>
      <div
        onMouseDown={handleStart(0)}
        onTouchStart={handleStart(0)}
        className="absolute h-6 w-6 bg-white rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          left: `calc(${getPosition(values[0])}% - 12px)`,
          top: "-1.5px",
          border: "2px solid #2563eb",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      ></div>
      <div
        onMouseDown={handleStart(1)}
        onTouchStart={handleStart(1)}
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
