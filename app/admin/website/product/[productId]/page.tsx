import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

import React, { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import prismadb from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { NameProductForm } from "./_components/NameForm";
import { ShortDescriptionProductForm } from "./_components/ShortDescriptionForm";
import { FeatureProductForm } from "./_components/FeatureForm";
import { InventryProductForm } from "./_components/InventryForm";
import { PriceProductForm } from "./_components/PriceForm";
import { ProductDescriptionForm } from "./_components/DescriptionForm";
import ListCard from "@/components/ui/ListCard";
import { EditProductDescriptionForm } from "./_components/EditDescriptionForm";
import { LocationProductForm } from "./_components/LocationForm";
import { ImageProductForm } from "./_components/ImageForm";
import { CategoriesProductForm } from "./_components/EditCategories";
import { ColorProductForm } from "./_components/EditColor";
// import Image from "next/image";

const DisabledInput = ({ text, value, placeholder, disabled }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{text}</label>
      <input
        className="p-2 border-[2px] text-sm  rounded-lg active:ring-2 ring-black placeholder:text-muted-foreground"
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default async function ProductFormPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      category: true,
      color: true,
      occassion: true,
      description: true,
      images: true,
      pattern: true,
      type: true,
      SubType: true,
      blouseColor: true,
      palluColor: true,
      fabric: true,
      blousePattern: true,
      border: true,
      borderColor: true,
      buttiType: true,
      Color: true,
      palluMotif: true,
      sareeMotif: true,
      weave: true,
      weaveType: true,
      zari: true,
      zariColor: true,
    },
  });

  const Weave = await prismadb.weave.findMany({
    include: {
      WeaveType: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const Category = await prismadb.category.findMany({
    include: {
      BlousePattern: {
        orderBy: {
          name: "asc",
        },
      },
      Border: {
        orderBy: {
          name: "asc",
        },
      },
      ButtiType: {
        orderBy: {
          name: "asc",
        },
      },
      Fabric: {
        include: {
          Type: {
            include: {
              SubType: {
                orderBy: {
                  name: "asc",
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
      PalluMotif: {
        orderBy: {
          name: "asc",
        },
      },
      Pattern: {
        orderBy: {
          name: "asc",
        },
      },
      SareeMotif: {
        orderBy: {
          name: "asc",
        },
      },
      Type: {
        include: {
          SubType: {
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      },
      Zari: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const Color = await prismadb.color.findMany({});
  const Occassion = await prismadb.occassion.findMany({});

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Link
          className="text-sm  md:text-lg flex gap-2 items-center"
          href={`/admin/website/product`}
        >
          <ArrowLeft className="w-4" />
          Back
        </Link>
        <h1 className="text-lg md:text-2xl">Product: {product?.name}</h1>
        <hr className="border-1 border-gray-400 " />
      </div>
      <div className="grid grid-cols-1  gap-8">
        {/* {isEditing && ( */}
        <Card className={"p-8 grid grid-cols-1 gap-4"}>
          {/* Categories  */}
          <div className="grid grid-cols-1  gap-4">
            {/* {product?.category && (
              <DisabledInput
                text={"Category"}
                value={product?.category.name}
                disabled={true}
                placeholder={"Category"}
              />
            )}
            {product?.occassion && (
              <DisabledInput
                text={"Occassion"}
                value={product?.occassion.name}
                disabled={true}
                placeholder={"Occassion"}
              />
            )}
            {product?.pattern && (
              <DisabledInput
                text={"Pattern"}
                value={product?.pattern.name}
                disabled={true}
                placeholder={"Pattern"}
              />
            )}
            {product?.type && (
              <DisabledInput
                text={"Type"}
                value={product?.type.name}
                disabled={true}
                placeholder={"Type"}
              />
            )}
            {product?.color && (
              <DisabledInput
                text={"Color"}
                value={product?.color.name}
                disabled={true}
                placeholder={"Color"}
              />
            )} */}
            {product && (
              <CategoriesProductForm
                productId={product.id}
                initialdata={product}
                Category={Category}
                Occassion={Occassion}
                Weave={Weave}
              />
            )}
            {product && (
              <ColorProductForm
                productId={product.id}
                initialdata={product}
                Color={Color}
              />
            )}
          </div>
          {/* Image and Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Logo*/}
            {/* <LogoServiceForm
              serviceId={service?.id || ""}
              imageUrl={service?.logo || ""}
            /> */}
            {/* Image */}
            <ImageProductForm initialData={product} />
          </div>
          {/* Name  and Description*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <NameProductForm
              name={product?.name || ""}
              productId={product?.id || ""}
            />
            <InventryProductForm
              qty={product?.qty || 0}
              productId={product?.id || ""}
            />
            {/* Description */}
            <ShortDescriptionProductForm
              shortDescription={product?.shortDescription || ""}
              productId={product?.id || ""}
            />
            {/* <FeatureProductForm
              features={product?.features || ""}
              productId={product?.id || ""}
            /> */}

            {/* <DescriptionServiceForm
              serviceId={service?.id || ""}
              description={service?.description || ""}
            /> */}
          </div>
          {/* <PriceProductForm
            productId={product?.id || ""}
            //   discount={product?.Discount?.discount || 0}
            price={product?.price || 0}
            offer_price={product?.offer_price || 0}
          /> */}
          {/* <LocationProductForm
            service_location={product?.location || ""}
            productId={product?.id || ""}
          /> */}
          <div className="flex flex-col gap-4">
            <ProductDescriptionForm productId={product?.id || ""} />
            <div className="grid grid-cols-1 gap-2 ">
              {product?.description.map((desc) => (
                <ListCard
                  className={"flex flex-col items-center"}
                  key={desc.id}
                >
                  {/* {desc.key}: {desc.value} */}
                  <EditProductDescriptionForm
                    initialData={desc}
                    productId={product.id}
                  />
                </ListCard>
              ))}
            </div>
          </div>
          {/* Services Form */}
          <div className="grid grid-cols-1  gap-4">
            {/* <div className="flex flex-col gap-4">
              <EnquiryServiceForm serviceId={service?.id || ""} />
              <div className="grid grid-cols-1 md:grid-cols-2  gap-2 ">
                {service?.EnquiryService.map((enquiryService) => (
                  <ListCard
                    className={"flex flex-col items-center"}
                    key={service.id}
                  >
                    <EditEnquiryServiceForm
                      initialData={enquiryService}
                      serviceId={service.id}
                      enquiryserviceId={enquiryService.id}
                    />
                  </ListCard>
                ))}
              </div>
            </div> */}
            {/* Feature Form */}
            {/* <div className="flex flex-col gap-4">
              <ServiceFeatureForm serviceId={service?.id || ""} />
              <div className="flex flex-col gap-2">
                {service?.ServiceFeatures.map((feature) => (
                  <ListCard className={"w-full p-2"} key={feature.id}>
                    <EditFeatureServiceForm
                      initialData={feature}
                      serviceId={service.id}
                      featureserviceId={feature.id}
                    />
                  </ListCard>
                ))}
              </div>
            </div> */}
          </div>
          {/* Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="flex flex-col gap-4">
              <ServiceContactForm serviceId={service?.id || ""} />
              <div className="flex flex-col gap-2">
                {service?.ServiceContactForm.map((contact) => (
                  <ListCard
                    className={"w-full p-2 flex flex-col"}
                    key={service.id}
                  >
                    <EditContactServiceForm
                      initialData={contact}
                      serviceId={service.id}
                      contactserviceId={contact.id}
                    />
                    
                  </ListCard>
                ))}
              </div>
            </div> */}
          </div>
          {/* Map Url */}
          {/* <iframe
            src={service?.mapUrl}
            // @ts-ignore
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            style={{}}
            width="600"
            height="450"
          ></iframe> */}
        </Card>
        {/* )} */}
      </div>
    </div>
  );
}
