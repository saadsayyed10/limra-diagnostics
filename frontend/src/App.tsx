import { useAuth } from "@clerk/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { LifeLine } from "react-loading-indicators";

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <LifeLine color="#cc3131" size="medium" text="" textColor="" />
      </div>
    );
  }

  return isSignedIn ? (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  ) : (
    <Landing />
  );
};

export default App;
