import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import "./styles/App.css";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import { AuthLayout } from "./layouts/AuthLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import AppLayout from "./layouts/AppLayout";
import { NotFound } from "./pages/NotFound";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        icons={{
          loading: (
            <Loader2 className="animate-spin text-lg text-text-secondary" />
          ),
        }}
        position={"bottom-right"}
        theme={theme}
        toastOptions={{ className: "sonner-toast", duration: 2000 }}
      />
    </>
  );
}

export default App;
