import { Show, SignInButton, SignOutButton } from "@clerk/react";

const App = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Show when={"signed-out"}>
        <SignInButton mode="modal" />
      </Show>
      <Show when={"signed-in"}>
        <SignOutButton />
      </Show>
    </div>
  );
};

export default App;
