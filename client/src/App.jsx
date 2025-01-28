import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Toaster } from "sonner";
import { Loader } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import { AuthLayout } from "./layouts/AuthLayout";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import AppLayout from "./layouts/AppLayout";
import { HomePage, NotFound, Overview, Sheep, Login, Register } from "./pages";
import SheepDetails from "./features/sheep/SheepDetails";

function App() {
  const { theme } = useTheme();
  const routes = ["overview", "sheep"];
  const routesElements = {
    overview: <Overview />,
    sheep: <Sheep />,
    "sheep/new": <Sheep />,
    "sheep/:id": <SheepDetails />,
    // "sheep/:id/:tab": <ProjectDetails />,
    // users: <Users />,
  };
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

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="/app/overview" replace={true} />}
            />
            {/*  Routes of specific role */}
            {routes?.map((route) => (
              <Route
                key={route}
                path={route}
                element={
                  <ProtectedRoute>{routesElements[route]}</ProtectedRoute>
                }
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        icons={{
          loading: (
            <Loader className="animate-spin text-lg text-text-secondary" />
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
