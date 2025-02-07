import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Toaster } from "sonner";
import { Loader } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import { AuthLayout } from "./layouts/AuthLayout";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import AppLayout from "./layouts/AppLayout";
import {
  HomePage,
  NotFound,
  Overview,
  Sheep,
  Login,
  Register,
  Users,
  Categories,
  Shipments,
  Sales,
} from "./pages";
import SheepDetails from "./features/sheep/SheepDetails";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  const { theme } = useTheme();
  const [parent] = useAutoAnimate({ duration: 300 });
  const routes = [
    "overview",
    "sheep",
    "sheep/new",
    "sheep/:id",
    "users",
    "categories",
    "shipments",
    "sales",
  ];
  const routesElements = {
    overview: <Overview />,
    sheep: <Sheep />,
    "sheep/new": <Sheep />,
    "sheep/:id": <SheepDetails />,
    users: <Users />,
    categories: <Categories />,
    shipments: <Shipments />,
    sales: <Sales />,
  };
  return (
    <>
      <div className="h-dvh w-full" ref={parent}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<AuthLayout />}>
              <Route path="login" index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

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
      </div>
    </>
  );
}

export default App;
