// @ts-nocheck

"use client";

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const data = {
	products: [
		{
			name: "Raglan Sleeve T-shirt",
			text: "Kurta1",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta",
				image: "/assets/images/product/fashion/18-1.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "Saari1",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Saari",
				image: "/assets/images/product/fashion/18-2.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "saari2",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Saari",
				image: "/assets/images/product/fashion/18-2.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "Kurtaset1",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta Set",
				image: "/assets/images/product/fashion/18-3.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "KurtaSet2",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta Set",
				image: "/assets/images/product/fashion/18-3.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "Kurtaset3",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta Set",
				image: "/assets/images/product/fashion/18-3.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "Kurta2",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta",
				image: "/assets/images/product/fashion/18-1.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "saari3",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Saari",
				image: "/assets/images/product/fashion/18-2.png",
			},
		},
		{
			name: "Raglan Sleeve T-shirt",
			text: "Kurtaset4",
			images: "./assets/images/product/fashion/18-1.png",
			data: {
				type: "Kurta Set",
				image: "/assets/images/product/fashion/18-3.png",
			},
		},
	],
};
const InitialState = {
	properties: data.products,
	propertyPerPage: 4,
	propertyOnPage: [],
};

const PropertyListReducer = (state, action) => {
	if (action.type === "LOAD_DATA") {
		const indexOfLastProperty = 1 * state.propertyPerPage;
		const indexOfFirstProperty =
			indexOfLastProperty - state.propertyPerPage;
		const currentListOfProperty = action.properties.slice(
			indexOfFirstProperty,
			indexOfLastProperty
		);
		return {
			propertyOnPage: currentListOfProperty,
			properties: state.properties,
			propertyPerPage: state.propertyPerPage,
		};
	}

	if (action.type === "SHOW_MORE") {
		const indexOfLastProperty = 1 * (state.propertyPerPage + action.value);
		const indexOfFirstProperty =
			indexOfLastProperty - (state.propertyPerPage + action.value);
		const currentListOfProperty = state.properties.slice(
			indexOfFirstProperty,
			indexOfLastProperty
		);
		return {
			propertyOnPage: currentListOfProperty,
			properties: state.properties,
			propertyPerPage: state.propertyPerPage + 3,
		};
	}

	if (action.type === "FILTER") {
		const newItem = action.property.filter((newVal) => {
			return newVal.data.type === action.curcity;
			// comparing category for displaying data
		});

		const indexOfLastProperty = 1 * action.propertyPerPage;
		const indexOfFirstProperty =
			indexOfLastProperty - action.propertyPerPage;
		const currentListOfProperty = newItem.slice(
			indexOfFirstProperty,
			indexOfLastProperty
		);

		return {
			propertyOnPage: currentListOfProperty,
			properties: newItem,
			propertyPerPage: state.propertyPerPage,
		};
	}
	return InitialState;
};

const Tabsectionpart2 = () => {
	const [isActive, setIsActive] = useState(false);
	const [propertyList, dispatchPropertyList] = useReducer(
		PropertyListReducer,
		InitialState
	);

	const propertyLoadHandler = useCallback((propertyList) => {
		dispatchPropertyList({
			type: "LOAD_DATA",
			properties: propertyList,
		});
	}, []);

	useEffect(() => {
		propertyLoadHandler(data.products);
	}, []);

	const showMoreHandler = () => {
		dispatchPropertyList({
			type: "SHOW_MORE",
			value: 3,
		});
	};

	const filterItem = (curcity) => {
		setIsActive(true);
		dispatchPropertyList({
			type: "FILTER",
			property: data.products,
			curcity,
			propertyPerPage: 6,
		});
	};

	const cities = [...new Set(data.products.map((Val) => Val.data.type))];

	// console.log(propertyList.properties.length);
	// console.log(propertyList.propertyOnPage.length);

	// if (
	// 	(propertyList.properties.length > propertyList.propertyOnPage.length)
	// ) {
	// 	setDataAvailable(false);
	// }

	return (
		<div className="bg-slate-300 ">
			<div className="container m-auto py-8 px-10 flex flex-col gap-y-5">
				{/* <Header /> */}
				<div className="flex justify-between items-center">
					<div className="flex gap-6 my-6 justify-between">
						{cities.map((city, id) => {
							return (
								<>
									<button
										className={`bg-slate-200 border-none text-black px-6 w-36 h-36 rounded-full ${
											isActive ? "bg-indigo-600" : ""
										}`}
										onClick={() => filterItem(city)}
										key={id}
									>
										{city}
										{/* <img src={city} /> */}
									</button>
								</>
							);
						})}
					</div>
					<div>
						<button
							className="flex items-center gap-3 px-4"
							onClick={() => propertyLoadHandler(data.products)}
						>
							<span>View All</span>
							{/* <BsArrowRight /> */}
						</button>
					</div>
				</div>

				<ul className="grid grid-cols-4 gap-6">
					{propertyList.propertyOnPage.map((property, index) => (
						<div key={index}>
							<div>
								<li key={property.id}>
									{property.text}
									{/* <img src={property.images} /> */}
								</li>
							</div>
						</div>
					))}
				</ul>
				<button
					onClick={showMoreHandler}
					className="w-fit self-center text-white px-4 bg-indigo-600"
				>
					Show More
				</button>
			</div>
		</div>
	);
};

export default Tabsectionpart2;
