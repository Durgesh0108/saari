import Footer from "@/components/FRONTEND/Footer";
import Navbar from "@/components/FRONTEND/navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
