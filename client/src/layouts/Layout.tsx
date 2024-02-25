import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserModal from "../components/UserModal";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-blue/30">
      <Header />
      <main className="flex-grow h-[calc(100%_-_60px)] flex flex-col">
        <Outlet />
      </main>
      <UserModal />
      <Footer />
    </div>
  );
};
export default Layout;
