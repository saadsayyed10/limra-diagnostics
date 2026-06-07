import { UserButton } from "@clerk/react";
import { Bell, Moon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white px-6 flex items-center justify-between">
      <div />

      <div className="flex items-center gap-4">
        <Bell className="w-4 h-4" />
        <Moon className="w-4 h-4" />
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
