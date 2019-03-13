import React from "react";

export const MessageStore = ({ message, children }) => {
  return (
    <div className="welcome">
      <h1>{message.text}</h1>
      <p>{children}</p>
    </div>
  );
};


