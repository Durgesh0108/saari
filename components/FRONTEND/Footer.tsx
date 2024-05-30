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
    <div className="bottom-0">
      <div id="footer" className="footer">
        <div className="footer-main bg-surface">
          <div className="container">
            <div className="content-footer md:py-[60px] py-10 flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                <Link href="/" className="logo inline-block">
                  <div className="heading3 w-fit">Anvogue</div>
                </Link>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col ">
                    <span className="text-button">Mail:</span>
                    <span className="text-button mt-3">Phone:</span>
                    <span className="text-button mt-3">Address:</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="">hi.avitex@gmail.com</span>
                    <span className="mt-[14px]">1-333-345-6868</span>
                    <span className="mt-3 pt-1">
                      549 Oak St.Crystal Lake, IL 60014
                    </span>
                  </div>
                </div>
              </div>
              <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Infomation</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href="/Contactus"
                    >
                      Contact us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="/aboutus"
                    >
                      About Us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="my-account.html"
                    >
                      My Account
                    </Link>
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="order-tracking.html"
                    >
                      Order &amp; Returns
                    </Link> */}
                    {/* <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="faqs.html"
                    >
                      FAQs
                    </Link> */}
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href="shop-breadcrumb1.html"
                    >
                      Women
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="shop-breadcrumb1.html"
                    >
                      Men
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="shop-breadcrumb1.html"
                    >
                      Clothes
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="shop-breadcrumb1.html"
                    >
                      Accessories
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="blog-default.html"
                    >
                      Blog
                    </Link>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">
                      Customer Services
                    </div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href="/Faq"
                    >
                      FAQs
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="/Shipping"
                    >
                      Shipping
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="/privacyPolicy"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href="/ReturnExchange"
                    >
                      Return &amp; Exchange
                    </Link>
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
                <div className="copyright caption1 text-secondary">
                  ©2024 Anvogue. All Rights Reserved.
                </div>
                <div className="select-block flex items-center gap-5 max-md:hidden">
                  <div className="choose-language flex items-center gap-1.5">
                    <select
                      name="language"
                      id="chooseLanguageFooter"
                      className="caption2 bg-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Espana">Espana</option>
                      <option value="France">France</option>
                    </select>
                    <i className="ph ph-caret-down text-xs text-[#1F1F1F]" />
                  </div>
                  <div className="choose-currency flex items-center gap-1.5">
                    <select
                      name="currency"
                      id="chooseCurrencyFooter"
                      className="caption2 bg-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <i className="ph ph-caret-down text-xs text-[#1F1F1F]" />
                  </div>
                </div>
              </div>
              <div className="right flex items-center gap-2">
                <div className="caption1 text-secondary">Payment:</div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-0.png"
                    alt="payment"
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-1.png"
                    alt="payment"
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-2.png"
                    alt="payment"
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-3.png"
                    alt="payment"
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-4.png"
                    alt="payment"
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <img
                    src="assets/images/payment/Frame-5.png"
                    alt="payment"
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
