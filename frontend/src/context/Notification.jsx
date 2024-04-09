import React, { Children, useContext } from "react";
import { notification } from "antd";
import { duration, max } from "moment";

const NotificationContext = React.createContext();

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const openNotification = ({ message, description, type }) => {
    notification[type]({
      message,
      description,
      duration: 1,
    });
  };
  return (
    <NotificationContext.Provider value={openNotification}>
      {children}
    </NotificationContext.Provider>
  );
}
