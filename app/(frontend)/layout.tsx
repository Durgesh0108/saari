import Footer from "@/components/FRONTEND/Footer";
import Navbar from "@/components/FRONTEND/Navbar";


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
