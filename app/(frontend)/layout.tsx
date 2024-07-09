import Footer from "@/components/FRONTEND/Footer";
import Header from "@/components/FRONTEND/Header";

// import "@/public/dist/output-tailwind.css";

const Layout = ({ children }) => {
  return (
    <>
      {/* <link rel="stylesheet" href="dist/output-tailwind.css" /> */}
      <div className="bg-white h-screen flex  flex-col justify-between overflow-auto  no-scrollbar">
        <Header />
        <div className="mt-16 relative top-20 md:mt-0">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
