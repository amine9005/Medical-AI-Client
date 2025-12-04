import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProtectRoute from "./Components/Auth/ProtectRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MedicalAgent from "./Pages/MedicalAgent/MedicalAgent";
import { useAuth } from "@clerk/clerk-react";
import History from "./Pages/History/History";
import Billing from "./Pages/Billing/Billing";

function App() {
  const { getToken } = useAuth();
  getToken().then((token) => console.log(token));

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
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
