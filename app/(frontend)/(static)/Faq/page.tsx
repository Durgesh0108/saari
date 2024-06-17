import Link from "next/link";
import React from "react";

const Faq = () => {
  return (
    <div>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[35px] pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Faq</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2" />
                  <div className="text-secondary2 capitalize">Faq</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about md:pt-10 pt-2">
        <div className="about-us-block">
          <div className="container">
            <div className="text flex items-center justify-center">
              <div className="content md:w-5/6 w-full">
                <div className="text-2xl font-bold">
                  About the Encircle Program
                </div>
                <div className="body1  md:mt-7 mt-5 flex flex-col gap-4">
                  <p>
                    Encircle is Titan’s Unified Loyalty program where the
                    members can enjoy various benefits & experiences and also
                    earn & redeem points with every purchase. The Encircle
                    points are now on-board with NeuPass wherein every time you
                    spend with Titan or other brands on NeuPass, you get to earn
                    NuCoins. The NuCoins can now be earned and redeemed across
                    all company brand stores or e-commerce websites across our
                    brands- Tanishq, Mia, Zoya, World of Titan, Fastrack,
                    Helios, Titan Eyeplus, Skinn, Taneira and Caratlane. To know
                    more
                  </p>
                  <div className="text-2xl font-bold">
                    Who can register in the Encircle Program?
                  </div>
                  <p>
                    Membership is voluntary and open to all Indian citizens
                    above 18 years and with a valid Indian mobile number. The
                    Titan Encircle membership is only for individual use and not
                    for corporate purchases. The Titan Encircle membership is
                    non-transferable. Offers/ benefits/ discounts offered to the
                    Encircle member are limited to the respective individual
                    only. These offers are not transferable to other Encircle
                    member/ non-member. Two or more offers cannot be clubbed
                    together.
                  </p>
                  <div className="text-2xl font-bold">
                    How Do I Enrol at Titan Encircle?
                  </div>
                  <p>
                    On making a purchase at the above mentioned stores or
                    e-commerce websites, you will be added to Titan Encircle as
                    a Silver tier member.
                  </p>
                  <p>
                    During this process, a membership number will be assigned to
                    you and your unique registered mobile number will be mapped
                    against this membership number. Each mobile number can only
                    be mapped to one Titan Encircle membership. Please note that
                    your name and mobile number are mandatory for this process.
                    OTP verification is a must to enroll.
                  </p>
                  <div className="text-2xl font-bold">
                    How Do I Upgrade My Tier?
                  </div>
                  <p>
                    You can upgrade your tier based on the cumulative NuCoins
                    that you have earned in a period of 24 months from the date
                    of enrolment or the date of your last upgrade/downgrade only
                    through the purchase at Titan brands i.e. Tanishq, Mia,
                    Zoya, World of Titan, Helios, Sonata, Fastrack, Titan Eye+,
                    Taneira, Skinn & Irth stores or respective brand ecom
                    websites.
                  </p>
                  <p>
                    To retain your tier, you should maintain the threshold
                    NuCoins for 24 months from the date of tier upgrade. If this
                    criteria is not met, you would be moved down by one tier.
                    Please refer to the ‘Tiers and NuCoins’ table on NeuPass
                    FAQs for the number of NuCoins required to maintain each
                    tier.
                  </p>

                  <p>
                    Your tier will be valid for two years from the date of your
                    last upgrade.
                  </p>
                  <div className="text-2xl font-bold">
                    What Will Happen to My Points When Goods Are Returned?
                  </div>
                  <p className="mb-8">
                    When you return/change goods that you have purchased, the
                    calculation of NuCoins to be debited will be done according
                    to the rules of your tier when you made the purchase, not on
                    the lowest tier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
