import { Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { csrfFetch } from "./utils/csrf";
import { useSession } from "./context/Session";
import Loader from "./components/UI/Loader";
import Dashboard from "./pages/DashboardPage";

const RegisterPage = lazy(() => import("./pages/SessionPages/RegisterPage"));
const Layout = lazy(() => import("./layout/PageLayout"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const LoginPage = lazy(() => import("./pages/SessionPages/LoginPage"));

function App() {
  const { isLoading } = useSession();
  const navigate = useNavigate();


  return (
    // ! Create better loading component
    <Suspense fallback={<Loader />}>
      <ReactQueryDevtools initialIsOpen={false} />
      {!isLoading && (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route path="members" element={<TeamPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route
              path="projects/:projectId"
              element={<ProjectDetailsPage />}
            />
          </Route>
          <Route path="/register/:token" element={<RegisterPage />} />
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
