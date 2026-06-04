import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50">
      {/* Prevent sidebar from shrinking when table content overflows */}
      <div className="shrink-0">
        <Sidebar />
      </div>

      {/* Force the main content container to stay within the viewport bounds */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Navbar />

        {/* overflow-x-hidden stops page scroll; overflow-y-auto keeps main content scrollable */}
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
