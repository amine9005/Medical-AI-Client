import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectRoute from "./Components/Auth/ProtectRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MedicalAgent from "./Pages/MedicalAgent/MedicalAgent";
import History from "./Pages/History/History";
import Billing from "./Pages/Billing/Billing";

function App() {
  return (
    <div className=" min-h-screen bg-linear-to-r from-blue-300  to-blue-100">
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/medical-agent/:sessionId"
                element={<MedicalAgent />}
              />
              <Route path="/history" element={<History />} />
              <Route path="/pricing" element={<Billing />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
