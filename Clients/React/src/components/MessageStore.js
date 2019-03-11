import React from "react";

const MessageStore = ({ message, children }) => {
  return (
    <div className="welcome">
      <h1>{message.text}</h1>
      <p>{children}</p>
    </div>
  );
};

export default MessageStore;
