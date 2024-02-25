import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/app";
const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  if (!user?.token) return <Navigate to="/login" replace />;
  return children || <Outlet />;
};

export default ProtectRoute;
