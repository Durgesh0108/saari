import Image from "next/image";
import React from "react";
import Banner1 from "@/public/assets/images/banner/1.png";

const Fixedimage = () => {
	return (
		<div>
			<div className="banner-block style-one grid sm:grid-cols-2 gap-5 md:pt-20 pt-10">
				<a
					href="shop-breadcrumb-img.html"
					className="banner-item relative block overflow-hidden duration-500"
				>
					<div className="banner-img">
						{/* <img
              src="assets/images/banner/1.png"
              className="duration-1000"
              alt="img"
            /> */}
						<Image alt="" src={Banner1} />
					</div>
					<div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
						<div className="heading2 text-white">Best Sellers</div>
						<div className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
							Shop Now
						</div>
					</div>
				</a>
				<a
					href="shop-breadcrumb-img.html"
					className="banner-item relative block overflow-hidden duration-500"
				>
					<div className="banner-img">
						<img
							src="assets/images/banner/2.png"
							className="duration-1000"
							alt="img"
						/>
					</div>
					<div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
						<div className="heading2 text-white">New Arrivals</div>
						<div className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
							Shop Now
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Fixedimage;
