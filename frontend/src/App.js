import { Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import TeamPage from "./pages/TeamPage";
import LoginPage from "./pages/SessionPages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import { csrfFetch } from "./utils/csrf";
import { useSession } from "./context/Session";

const RegisterPage = lazy(() => import("./pages/SessionPages/RegisterPage"));
const Dashboard = lazy(() => import("./layout/Dashboard"));

function App() {
  const { isLoading, user } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }
  , [user, navigate]);

  return (
    // ! Create better loading component
    <Suspense fallback={<div>Loading...</div>}>
      {!isLoading && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="members" element={<TeamPage />} />
            <Route index path="projects" element={<ProjectsPage />} />
          </Route>
          <Route path="/register/:token" element={<RegisterPage />} />
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
