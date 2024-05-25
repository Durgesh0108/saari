import Link from "next/link";
import React from "react";

const Page = () => {
	return (
		<div>
			<div className="breadcrumb-block style-shared">
				<div className="breadcrumb-main bg-linear overflow-hidden">
					<div className="container lg:pt-[134px] pt-24 pb-10 relative">
						<div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
							<div className="text-content">
								<div className="heading2 text-center">
									About Us
								</div>
								<div className="link flex items-center justify-center gap-1 caption1 mt-3">
									<Link href="/">Homepage</Link>
									<i className="ph ph-caret-right text-sm text-secondary2" />
									<div className="text-secondary2 capitalize">
										About Us
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="about md:pt-20 pt-10">
				<div className="about-us-block">
					<div className="container">
						<div className="text flex items-center justify-center">
							<div className="content md:w-5/6 w-full">
								<div className="heading3 text-center">
									Story of the brand
								</div>
								<div className="body1  md:mt-7 mt-5">
									Launched in 2017, Taneira, from the house of
									TATA, is home to exquisite sarees, dress
									materials and ready-to-wear kurtas, crafted
									from pure and natural fabrics. As an ethnic
									wear brand from Titan, Taneira brings the
									best of India under one roof. You will find
									over 100+ clusters of diverse textiles and
									rich craftsmanship from across the country.
									<br></br>
									<br></br>
									These products are crafted with love and
									care for the rooted yet contemporary Indian
									women for every occasion. The Taniera woman
									can explore carefully curated pieces that
									are unique and exclusive for celebratory
									events like festivals and weddings, special
									days including pujas or parties, and
									stand-out looks for office and everyday
									wear.
									<br></br>
									<br></br>
									Instilled with the TATA trust, the very
									ethos of Taneira is a celebration of Indian
									culture. Through our brand and our products,
									we honour the heritage of India – diverse
									arts, rich craftsmanship and the intricate
									art of weaving.
									<br></br>
									<br></br>
									In our quest to keep our heritage thriving
									and more meaningful, we have embarked on a
									journey to create several “Weavershalas”
									across the country. These Weavershalas have
									been conceived to transform the lives, and
									create a sustainable livelihood for skilled
									weavers and artisans. We are making
									significant efforts to improve their
									ecosystem with better infrastructure,
									new-age looms, hygienic environments and
									medical care - so we can give back to the
									masters behind the loom. The first of these
									Weavershalas have been set up in Varanasi,
									Champa, Coimbatore, Phulia, Baruipur and we
									plan to expand to other parts of the country
									as well.
									<br></br>
									<br></br>
									At Taneira, we have been able to use our
									passion for innovation, pride in our culture
									and our design’s team’s evolved vision to
									create first-of-its-kind pieces of wearable
									art that bring together modern
									interpretations and timeless crafts.
									<br></br>
									<br></br>
									Our stores are uniquely designed for a
									relaxed browsing experience across most
									major cities in India. They focus on product
									storytelling, sharing the rich heritage and
									authenticity of each product with the
									consumer. After all, you are not buying a
									mere fashion piece. Each saree has a story
									to tell that is unique.
									<br></br>
									<br></br>
									Immerse yourself in the art of weaving and
									the heirloom pieces at our stores across all
									prominent metro hubs or shop from the
									comfort of your home, and enjoy global
									delivery at www.taneira.com.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
