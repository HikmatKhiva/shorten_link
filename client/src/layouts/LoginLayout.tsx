import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/app";
import { useEffect } from "react";
import Footer from "../components/Footer";
const LoginLayout = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.token) return navigate("/");
  }, [user?.token, navigate]);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-primary-blue/30">
      <main className="mb-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default LoginLayout;
