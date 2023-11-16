import React from "react";

export function Reddit({ handleClick, message }) {
    return (
      <button
        onClick={handleClick}
      >
        {message}
      </button>
    );
}
