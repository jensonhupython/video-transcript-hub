import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AppPage from "./pages/AppPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFound } from "./components/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Combined sign-in / sign-up screen. /sign-in and /sign-up open it
          directly in the matching mode; /auth keeps the original entry point. */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/sign-in" element={<AuthPage initialMode="signin" />} />
      <Route path="/sign-up" element={<AuthPage initialMode="signup" />} />

      {/* Client-side auth guard, replacing the TanStack _authenticated layout. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
