import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/react";

const Dashboard = () => {
  //   const handleSync = async () => {};

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
