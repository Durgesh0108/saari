"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { City, District, State } from "@prisma/client";

import axios from "axios";

import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import ListCard from "@/components/ui/ListCard";
import { getStates } from "@/actions/location/state/getStates";
import getcitybyState from "@/actions/location/city/getCity";
import { getDistrictByCity } from "@/actions/location/district/getDistrict";
import MultiSelectDropdown from "@/components/ui/MultiSelect";
import MultiSelect, { Option } from "@/components/ui/MultiSelect";
import Header from "../ui/header";

export default function ServiceLocation({ sendDataToParent }) {
  const [States, setStates] = useState<State[]>([]);
  const [Cities, setCities] = useState<City[]>([]);
  const [Districts, setDistricts] = useState<District[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      const data = await getStates();
      setStates(data);
      setSelectedState(data[0]?.id);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const cityData = await getcitybyState(selectedState);
        setCities(cityData);
        setSelectedCity(cityData[0]?.id);
      }
    };

    fetchCities();
  }, [selectedState]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        const districts = await getDistrictByCity(selectedCity);
        setDistricts(districts);
      }
    };

    fetchDistricts();
  }, [selectedCity]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const [optionSelected, setSelected] = useState<Option[] | null>();
  const handleChange = (selected: Option[]) => {
    setSelected(selected);
    sendDataToParent(optionSelected);
  };

  const handleSave = () => {
    console.log(optionSelected);
    sendDataToParent(optionSelected);
  };

  const districtOptions = [];

  for (let i = 0; i < Districts.length; i++) {
    // console.log(i);
    let district = {
      value: Districts[i].id,
      label: Districts[i].name,
    };

    districtOptions.push(district);

    // console.log(districtOptions);
  }

  // const options = Districts.map((district) => (
  //   const newItem = {

  //   }
  // ));

  // console.log("Final selected Districts", districtOptions);
  // console.log("option selected", optionSelected);

  // const options = [
  //   { value: 0, label: "Goranboy" },
  //   { value: 1, label: "Safikurd" },
  //   { value: 2, label: "Baku" },
  //   { value: 3, label: "Ganja" },
  //   { value: 4, label: "Shusha" },
  //   { value: 5, label: "Agdam" },
  // ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="block text-sm font-medium text-gray-900 dark:text-white">
            Service Address
          </h1>
          {!isEditing && (
            <Button className="flex" onClick={() => setIsEditing(true)} size={"me"}>
              <Plus />
              New
            </Button>
          )}
        </div>
        {isEditing && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <select
                name="category"
                id="category"
                // className="ring-2 ring-black p-2 rounded-lg hover:ring w-full hover:ring-gray-800"
                className="p-2 border-black border-[1px] rounded-lg"
                onChange={handleStateChange}
              >
                {States.length === 0 && <option>No State Available</option>}
                {States.map((State) => (
                  <option value={State.id} key={State.id}>
                    {State.name}
                  </option>
                ))}
              </select>

              <select
                name="category"
                id="category"
                onChange={handleCityChange}
                // className="ring-2 ring-black p-2 rounded-lg hover:ring hover:ring-gray-800"
                className="p-2 border-black border-[1px] rounded-lg"
              >
                {Cities.length === 0 && <option>No City Available</option>}
                {Cities.map((city) => (
                  <option value={city.id} key={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <MultiSelect
              key="example_id"
              options={districtOptions}
              onChange={handleChange}
              value={optionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
            <Button onClick={handleSave} type="button">
              Save
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
