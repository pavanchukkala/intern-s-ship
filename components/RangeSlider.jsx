"use client";
import React from "react";
import { Range } from "react-range";

const RangeSlider = ({ min, max, step = 1, values, onChange }) => {
  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            background: "#ddd",
            borderRadius: "3px",
            margin: "0 15px",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            backgroundColor: "#FFF",
            border: "2px solid #CCC",
          }}
        />
      )}
    />
  );
};

export default RangeSlider;
