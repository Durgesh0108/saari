import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaCaretUp,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bottom-0 relative top-20 ">
      <div id="footer" className="footer">
        <div className="footer-main bg-surface">
          <div className="container">
            <div className="content-footer md:py-[60px] py-10 flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                <Link href="/" className="logo inline-block">
                  <div className="heading3 w-fit">Saari Waali</div>
                </Link>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col ">
                    <span className="text-button">Mail:</span>
                    <span className="text-button mt-3">Phone:</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="">saariwali@gmail.com</span>
                    <span className="mt-[14px]">9876543210</span>
                  </div>
                </div>
              </div>
              <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Infomation</div>
                    <div className="group ">
                      <Link href="/Contactus">Contact us</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/aboutus">About Us</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/Login">My Account</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/Register">Register</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Quick Shop</div>
                    <div className="group ">
                      <Link href="/">Saari</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/">Kurta</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/">Kurta Set</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">
                      Customer Services
                    </div>
                    <div className="group ">
                      <Link href="/Faq">FAQs</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/Shipping">Shipping</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/privacyPolicy">Privacy Policy</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                    <div className="group ">
                      <Link href="/ReturnExchange">Return & Exchange</Link>
                      <div
                        className={`duration-300 w-0  group-hover:w-1/3 rounded-full border-b-2 border-b-black `}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                  <div className="text-button-uppercase">Newletter</div>
                  <div className="caption1 mt-3">
                    Sign up for our newsletter and get 10% off your first
                    purchase
                  </div>
                  <div className="input-block w-full h-[52px] mt-4">
                    <form className="w-full h-full relative" action="post">
                      <input
                        type="email"
                        placeholder="Enter your e-mail"
                        className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
                      />
                      <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                        <i className="ph ph-arrow-right text-xl text-white" />
                      </button>
                    </form>
                  </div>
                  <div className="list-social flex items-center gap-6 mt-4">
                    <Link href="https://www.facebook.com/" target="_blank">
                      {/* <div className="icon-facebook text-2xl text-black" /> */}
                      <FaFacebookF className="text-lg" />
                    </Link>
                    <Link href="https://www.instagram.com/" target="_blank">
                      {/* <div className="icon-instagram text-2xl text-black" /> */}
                      <FaInstagram className="text-lg" />
                    </Link>
                    <Link href="https://www.twitter.com/" target="_blank">
                      {/* <div className="icon-twitter text-2xl text-black" /> */}
                      <FaTwitter className="text-lg" />
                    </Link>
                    <Link href="https://www.youtube.com/" target="_blank">
                      {/* <div className="icon-youtube text-2xl text-black" /> */}
                      <FaYoutube className="text-lg" />
                    </Link>
                    <Link href="https://www.pinterest.com/" target="_blank">
                      {/* <div className="icon-pinterest text-2xl text-black" /> */}
                      <FaPinterestP className="text-lg" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
              <div className="left flex items-center gap-8">
                <div className="">
                  ©2024 R5 Design Hub. All Rights Reserved.
                </div>
              </div>
              <div className="right flex items-center gap-2">
                <div className="caption1 text-secondary">Payment:</div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-0.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-1.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-2.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-3.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-4.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src="/assets/images/payment/Frame-5.png"
                    alt="payment"
                    width={1000}
                    height={1}
                    className="w-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   <Link className="scroll-to-top-btn" href="#top-nav">
    //   <i className="ph-bold ph-caret-up" />
    //   <FaCaretUp />

    // </Link>
  );
};

export default Footer;
