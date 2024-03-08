import React, { Children, useContext } from "react";
import { notification } from "antd";

const NotificationContext = React.createContext();

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const openNotification = ({ message, description, type }) => {
    notification[type]({
      message,
      description,
    });
  };
  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
    </NotificationContext.Provider>
  );
}
