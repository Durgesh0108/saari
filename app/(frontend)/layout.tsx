import Footer from "@/components/FRONTEND/Footer";
import Navbar from "@/components/FRONTEND/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <link rel="stylesheet" href="dist/output-tailwind.css" />
      <div className="bg-white h-screen flex  flex-col justify-between overflow-auto  no-scrollbar">
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
