import { Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import TeamPage from "./pages/MembersPages/TeamPage";
import LoginPage from "./pages/SessionPages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";

const RegisterPage = lazy(() => import("./pages/SessionPages/RegisterPage"));
const Dashboard = lazy(() => import("./layout/Dashboard"));

function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function getSession() {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getSession();
  }, []);

  const handleLoginSuccess = (user) => {
    setSession({ user }); // Update the session state with the logged-in user
  };

  return (
    // ! Create better loading component
    <Suspense fallback={<div>Loading...</div>}>
      {!isLoading && (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage user={session.user} login={handleLoginSuccess} />
            }
          />
          <Route path="/" element={<Dashboard user={session.user} />}>
            <Route path="members" element={<TeamPage />} />
            <Route path="projects" element={<ProjectsPage />} />
          </Route>
          <Route path="/register/:token" element={<RegisterPage />} />
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
