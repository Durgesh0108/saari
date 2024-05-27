import Footer from "@/components/FRONTEND/Footer";
import Navbar from "@/components/FRONTEND/navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-white min-h-screen flex  flex-col justify-between">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
