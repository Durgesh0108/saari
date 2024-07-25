import Footer from "@/components/FRONTEND/Footer";
import Header from "@/components/FRONTEND/Header";

// import "@/public/dist/output-tailwind.css";

const Layout = ({ children }) => {
  return (
    <>
      {/* <link rel="stylesheet" href="dist/output-tailwind.css" /> */}
      <div className="bg-white h-screen flex  flex-col justify-between overflow-auto  no-scrollbar">
        <Header />

        <div className="relative top-16 sm:top-16 md:top-16 lg:top-20">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
