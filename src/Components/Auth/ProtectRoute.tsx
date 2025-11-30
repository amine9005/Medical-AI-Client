import { useUser, SignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router";

const ProtectRoute = () => {
  const { user } = useUser();

  return user ? (
    <Outlet />
  ) : (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
};

export default ProtectRoute;
