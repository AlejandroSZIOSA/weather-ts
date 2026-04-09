import React from "react";
import styles from "./Messages.module.css";

interface MessagesProps {
  variant: "error" | "success";
  children: React.ReactNode;
}

export const Messages: React.FC<MessagesProps> = ({ variant, children }) => {
  return (
    <div className={`${styles["messagesContainer"]} ${styles[variant]}`}>
      <h4>{children}</h4>
    </div>
  );
};
