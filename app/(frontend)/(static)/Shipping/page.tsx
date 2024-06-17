import Link from "next/link";
import React from "react";

const Shipping = () => {
  return (
    <div>
      <div className="breadcrumb-block style-shared">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[35px] pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-center">Shipping</div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3">
                  <Link href="/">Homepage</Link>
                  <i className="ph ph-caret-right text-sm text-secondary2" />
                  <div className="text-secondary2 capitalize">Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="body1  md:mt-7 mt-5 flex flex-col gap-6 px-8">
          <div className="text-2xl font-bold">
            Shipping and Handling Charges
          </div>
          <p>
            Domestic Order: We provide free shipping within India. International
            Order: In case of order which is to be shipped outside India
            customer has to bear the shipping & handling charges plus any duty
            as applicable at the destination.
          </p>
          <p>
            Custom Clearance: All shipments of apparel exported from India need
            to be cleared by the Indian Customs office. Products along with
            their complete documentation are filed with the authorized officer
            of the Indian Customs office for inspection, examination and
            assessment and only then delivered to your shipping address. Hence,
            please ignore the message on the package section which mentions:
            “Please do not accept if the package is received in Open/ Tampered
            condition”. You will find the package sealed with a label saying
            “Opened for Customs”.
          </p>
          <p>
            Shipping Partner: Our domestic logistic partner is Blue Dart,
            Delhivery, Ecom Express & UPS(Our international logistic partner)
            NOTE: In case of International order, the customer has to pay the
            shipping charges at the time of placing the order. Also, custom duty
            & taxes levied by destination country has to be borne by the
            customer and needs to be paid to the logistic partner at the time of
            delivery. Please note that all consignments are on Delivery Duty
            Unpaid (DDU) basis.
          </p>
          <div className="text-2xl font-bold">Time to Deliver:</div>
          <p>
            The time taken for delivery tends to vary according to the
            destination; however, we make our best efforts to ensure that the
            order is delivered on time.
          </p>
          <p>
            <strong>Delivery Time for Domestic Orders:</strong> It takes 7-10
            working days from the day of order confirmation to deliver the
            products within India given that the delivery is not delayed due to
            governmental authority or any other entity acting on behalf of the
            government or acting as per the directions of the government. In the
            unlikely event that the delivery period exceeds the stipulated time,
            the order is cancelled and the customer is notified of the same. In
            such cases, the refund is made directly to the customer’s bank
            account using the same mode the payment was made. Titan Company
            partners with reputed courier agencies to ensure prompt and secure
            delivery. Since the delivery of products is address specific, please
            ensure that the address entered while placing the order is correct.
          </p>
          <p>
            Important Note: In case the office address is provided for delivery,
            please make sure that the department details, employee number and
            direct landline numbers are also provided to prevent any last-minute
            hassles and failed delivery.
            <br></br>
            To prevent misplaced delivery, please keep one of the following
            identity cards for verification:
          </p>
          <ul className="list-disc px-5">
            <li>Pan card</li>
            <li>Driving License</li>
            <li>Passport</li>
            <li>Voter identification card</li>
            <li>Unique Identification Card (Aadhaar)</li>
          </ul>
          <p>
            <strong>Delivery Time for International Orders: </strong> The
            product is delivered within 7-21 working days outside India from the
            day of the order confirmation, provided such delivery is not delayed
            by any governmental authority or any other entity acting on behalf
            of the government or acting as per the directions of the government.
            In the unlikely event that we fail to deliver your order within the
            stipulated period, we shall cancel the order and notify you
            regarding the same. In such cases, the refund will be made directly
            to your account via the same mode through which the payment was
            made. We only partner with reputed courier agencies to ensure that
            the products reach you promptly and in perfect condition. We also
            ensure that the delivery is made to the recipient and thus require
            the identity proof for verification:
          </p>
          <p>
            PLEASE NOTE: Recipient needs to produce a passport or driving
            license for receiving the delivery. For any customer assistance, you
            can call on our toll-free number 1800-266-0123 or write to
            ecomsupport@titan.co.in
          </p>
          <p className="mb-8">
            Transit Insurance: All goods will be fully insured by Titan Company
            Limited until they reach you, so your purchase is 100% safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
