import { Outlet } from "react-router-dom";
import Sidebar from "@/components/app/Sidebar";
import AppBar from "@/components/app/AppBar";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AppLayout() {

  return (
    <div className="flex size-full">
      <Sidebar />
      <div className="ml-14 flex flex-1 flex-col overflow-hidden bg-background-secondary p-1.5 md:ml-0">
        <AppBar />
        <Main />
      </div>
    </div>
  );
}

function Main() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <main
      className="flex flex-1 flex-col gap-5 overflow-y-auto overflow-x-hidden rounded-xl bg-background-primary p-3 sm:rounded-2xl sm:px-5"
      ref={parent}
    >
      <Outlet />
    </main>
  );
}
