import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[35px] pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Contact Us</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2" />
                  <div className="text-secondary2 capitalize">Contact Us</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us md:py-20 py-10">
        <div className="container">
          <div className="flex justify-between max-lg:flex-col gap-y-10">
            <div className="left lg:w-2/3 lg:pr-4">
              <div className="heading3">Drop Us A Line</div>
              <div className="body1 text-secondary2 mt-3">
                Use the form below to get in touch with the sales team
              </div>
              <form className="md:mt-6 mt-4">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                  <div className="name ">
                    <input
                      className="border-line px-4 py-3 w-full rounded-lg"
                      id="username"
                      type="text"
                      placeholder="Your Name *"
                    />
                  </div>
                  <div className="email">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="email"
                      type="email"
                      placeholder="Your Email *"
                    />
                  </div>
                  <div className="message sm:col-span-2">
                    <textarea
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="message"
                      rows={3}
                      placeholder="Your Message *"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="block-button md:mt-6 mt-4">
                  <button className="button-main">Send message</button>
                </div>
              </form>
            </div>
            <div className="right lg:w-1/4 lg:pl-4">
              <div className="item">
                <div className="heading4">Our Store</div>
                <p className="mt-3">
                  2163 Phillips Gap Rd, West Jefferson, North Carolina, United
                  States
                </p>
                <p className="mt-3">
                  Phone: <span className="whitespace-nowrap">+1 666 8888</span>
                </p>
                <p className="mt-1">
                  Email:{" "}
                  <span className="whitespace-nowrap">hi.avitex@gmail.com</span>
                </p>
              </div>
              <div className="item mt-10">
                <div className="heading4">Open Hours</div>
                <p className="mt-3">
                  Mon - Fri:{" "}
                  <span className="whitespace-nowrap">7:30am - 8:00pm PST</span>
                </p>
                <p className="mt-3">
                  Saturday:{" "}
                  <span className="whitespace-nowrap">8:00am - 6:00pm PST</span>
                </p>
                <p className="mt-3">
                  Sunday:{" "}
                  <span className="whitespace-nowrap">9:00am - 5:00pm PST</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
