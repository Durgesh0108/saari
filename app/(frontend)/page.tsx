import CarouselSlider from "@/components/FRONTEND/Carousel";
import Clientinsta from "@/components/FRONTEND/ClientInsta";
import CollectionBlack from "@/components/FRONTEND/CollectionBlock";
import Fixedimage from "@/components/FRONTEND/FixedArea";
import Logoslider from "@/components/FRONTEND/LogoSlider";
import Promise from "@/components/FRONTEND/Promise";
import Tabsectionpart2 from "@/components/FRONTEND/TabSectionPart2";
import Testimonials from "@/components/FRONTEND/Testimonial";

import Image from "next/image";

export default function Home() {
	return (
		<>
			<div className="">
				<CarouselSlider />
				<div className="container">
					{/* <TabSection /> */}
					<CollectionBlack />
					<Tabsectionpart2 />
					<Promise />
					<Fixedimage />
					{/* <Servicesection /> */}
					<Testimonials />
					<Clientinsta />
					<Logoslider />
				</div>
			</div>
		</>
	);
}
