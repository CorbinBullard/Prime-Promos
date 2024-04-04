import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import NotificationProvider from "./context/Notification";
import { restoreCSRF } from "./utils/csrf";
import { TeamProvider } from "./context/useTeam";
import { SessionProvider } from "./context/Session";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
}

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SessionProvider>
          <NotificationProvider>
            <TeamProvider>
              <Router>
                <App />
              </Router>
            </TeamProvider>
          </NotificationProvider>
        </SessionProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
