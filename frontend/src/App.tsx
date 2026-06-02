import { useAuth } from "@clerk/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { LifeLine } from "react-loading-indicators";
import Layout from "./layout/Layout";
import Patients from "./pages/Patients";
import FForm from "./pages/FForm";
import Reports from "./pages/Reports";
import ANCSchedule from "./pages/ANCSchedule";
import Billing from "./pages/Billing";
import Clinic from "./pages/Clinic";

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
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/fform" element={<FForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/anc-schedule" element={<ANCSchedule />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/clinic" element={<Clinic />} />
        </Route>
      </Routes>
    </Router>
  ) : (
    <Landing />
  );
};

export default App;
