// /components/DualRangeSlider.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const DualRangeSlider = ({ min, max, values, onChange }) => {
  const [dragging, setDragging] = useState(null);
  const sliderRef = useRef(null);

  // Convert a value to a percentage for positioning the handles/active track.
  const getPosition = (value) => ((value - min) / (max - min)) * 100;

  // Begin dragging a handle.
  const handleMouseDown = (handleIndex) => (e) => {
    setDragging(handleIndex);
    e.preventDefault();
  };

  // End dragging.
  const handleMouseUp = () => {
    setDragging(null);
  };

  // Update handle positions based on mouse movement.
  const handleMouseMove = (e) => {
    if (dragging === null) return;
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(percent, 1));
    let newValue = Math.round(min + percent * (max - min));
    const newValues = [...values];

    if (dragging === 0) {
      // Prevent left handle from surpassing the right handle.
      if (newValue > newValues[1]) newValue = newValues[1];
      newValues[0] = newValue;
    } else {
      // Prevent right handle from dropping below the left handle.
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
      className="relative h-4 rounded-full"
      style={{
        margin: "0 15px",
        background: "linear-gradient(90deg, #f0f0f0, #f0f0f0)", // Base track color
      }}
    >
      {/* Active track with a vibrant gradient, slight blur, and shadow */}
      <div
        className="absolute rounded-full transition-all duration-200"
        style={{
          height: "100%",
          left: `${getPosition(values[0])}%`,
          width: `${getPosition(values[1]) - getPosition(values[0])}%`,
          background: "linear-gradient(90deg, #ff8a00, #e52e71)",
          filter: "blur(0.5px)",
          boxShadow: "0 2px 8px rgba(229, 46, 113, 0.6)",
        }}
      ></div>
      {/* Left handle with a radial gradient and halo effect */}
      <div
        onMouseDown={handleMouseDown(0)}
        className="absolute rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          height: "24px",
          width: "24px",
          background: "radial-gradient(circle, #ffffff 50%, #ff8a00 100%)",
          border: "2px solid #ff8a00",
          boxShadow: "0 0 10px rgba(255, 138, 0, 0.8)",
          left: `calc(${getPosition(values[0])}% - 12px)`,
          top: "-10px",
        }}
      ></div>
      {/* Right handle with a different hue for contrast */}
      <div
        onMouseDown={handleMouseDown(1)}
        className="absolute rounded-full cursor-pointer transition-transform transform hover:scale-110"
        style={{
          height: "24px",
          width: "24px",
          background: "radial-gradient(circle, #ffffff 50%, #e52e71 100%)",
          border: "2px solid #e52e71",
          boxShadow: "0 0 10px rgba(229, 46, 113, 0.8)",
          left: `calc(${getPosition(values[1])}% - 12px)`,
          top: "-10px",
        }}
      ></div>
    </div>
  );
};

export default DualRangeSlider;
