import { useAuth } from "@clerk/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Layout from "./layout/Layout";
import FForm from "./pages/FForm";
import Reports from "./pages/Reports";
import ANCSchedule from "./pages/ANCSchedule";
import Billing from "./pages/Billing";
import Clinic from "./pages/Clinic";
import { Loader2 } from "lucide-react";
import OBSPatients from "./pages/OBSPatients";
import RegularPatients from "./pages/RegularPatients";
import ViewFForm from "./pages/ViewFForm";

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return isSignedIn ? (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients/obs" element={<OBSPatients />} />
          <Route path="/patients/regular" element={<RegularPatients />} />
          <Route path="/fform" element={<FForm />} />
          <Route path="/fform/view" element={<ViewFForm />} />
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
