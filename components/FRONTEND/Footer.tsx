import React from "react";

import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

import visa from "@/public/visa-new.png";
import mccard from "@/public/mccard.png";
import newssl from "@/public/newssl-latest.png";
import razorpay from "@/public/razopay.png";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export default function Footer() {
  return (
    <footer className="w-full relative bottom-0">
      <div className=" px-10 bg-[#f2f2f2] py-4">
        <div className="md:container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
            <div className=" ">
              <h1 className="py-4 font-medium text-[18px] w-fit">
                <span>ABOUT</span>
                <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
              </h1>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href={"/contact"}>Contact us</Link>
                </li>
                <li>
                  <Link href={"/aboutUs"}>About us</Link>
                </li>
              </ul>
            </div>
            <div className=" ">
              <h1 className="py-4 font-medium text-[18px] w-fit">
                <span>POLICY</span>
                <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
              </h1>
              <ul className="flex flex-col gap-2">
                {/* <li>
                  <Link href={"/contact"}>Shipping</Link>
                </li> */}
                <li>
                  <Link href={"/"}>Return & Cancellations</Link>
                </li>
                <li>
                  <Link href={"/privacy_policy"}>Privacy Policy</Link>
                </li>
                <li>
                  <Link href={"/terms&condition"}>Terms and Conditions</Link>
                </li>
                <li>
                  <Link href={"/"}>FAQ</Link>
                </li>
              </ul>
            </div>
            <div className=" ">
              <h1 className="py-4 font-medium text-[18px] w-fit">
                <span>SOCIAL</span>
                <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
              </h1>
              <ul className="flex gap-2 items-center">
                <div>
                  <AiFillFacebook
                    style={{
                      color: "#4650dd",
                    }}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <AiFillInstagram
                    style={{
                      color: "#d2518f",
                    }}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <AiFillYoutube
                    style={{
                      color: "#ff0a0a",
                    }}
                    className="w-8 h-8"
                  />
                </div>
              </ul>
            </div>
            <div className=" ">
              {/* <h1 className="py-4 font-medium text-[18px] w-fit">
                <span>SUBCRIBE</span>

                <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
              </h1>
              <div className="flex gap-2">
                <Input placeholder="Email Address" />
                <Button>Subscribe</Button>
              </div> */}
              <h1 className="py-4 font-medium text-[18px] w-fit">
                <span>Advertise</span>

                <hr className="w-3/4 mt-2 border-[1px] border-[#00aecd]" />
              </h1>
              <Link href={`/advertisement`} passHref>
                <Button
                  className="bg-[#00aecd] w-full md:w-1/2"
                  variant="default"
                >
                  Advertise With Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>&#169; 2024 Probiz5.com</div>
            <div className="flex gap-4 ">
              <Image
                src={razorpay}
                width={40}
                height={1000}
                alt="Razorpay"
                className="object-contain"
              />
              <Image
                src={visa}
                width={60}
                height={1000}
                alt="Visa"
                className="object-contain"
              />
              <Image
                src={newssl}
                width={40}
                height={1000}
                alt="New SSL"
                className="object-contain"
              />
              <Image
                src={mccard}
                width={60}
                height={1000}
                alt="Master Card"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
