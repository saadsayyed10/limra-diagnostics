import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/react";

const Landing = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <SignInButton>
        <Button>Login</Button>
      </SignInButton>
    </div>
  );
};

export default Landing;
