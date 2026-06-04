import { syncUserAPI } from "@/api/clinic.api";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();

  const handleSync = async () => {
    try {
      await syncUserAPI(
        user?.id!,
        user?.fullName,
        user?.emailAddresses[0].emailAddress!,
        user?.imageUrl!,
      );
    } catch (error: any) {
      console.log("User account already exists");
    }
  };

  useEffect(() => {
    handleSync();
  }, [user]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
