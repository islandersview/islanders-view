"use client";

import SectionWrapper from "@/components/SectionWrapper";
import {
  ArrowLeft,
  MapPin,
  Milestone,
  PhilippinePeso,
  Section,
} from "lucide-react";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React, { useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookMessenger, FaViber } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

// Contact Information
const contactDetails = [
  {
    icon: <IoIosMail size={32} />,
    text: "islandersview.inquiry@gmail.com",
  },
  {
    icon: <FaFacebookMessenger size={24} />,
    text: "islandersview",
  },
  {
    icon: <FaViber size={24} />,
    text: "09945678901",
  },
  {
    icon: <FaPhoneAlt size={20} />,
    text: "09945678901",
  },
];

//generate metadata

// Function to fetch item details from the API
const getItemDetailsBySlug = async (slug: string) => {
  const res = await fetch(`/api/item/?slug=${slug}`);
  const data = await res.json();
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getItemDetailsBySlug(params.slug);
  return {
    title: data.attributes.name,
    description: data.attributes.description,
    image: data.attributes.images.data[0].attributes.url,
    type: "website",
    openGraph: {
      type: "website",
      title: data.attributes.name,
      description: data.attributes.description,
      images: [
        {
          url: data.attributes.images.data[0].attributes.url,
          width: 800,
          height: 600,
          alt: data.attributes.images.data[0].attributes.alt,
        },
      ],
    },
  };
}

// Page component
const Page = ({ params }: { params: { slug: string } }) => {
  const [item, setItem] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeSlide, setActiveSlide] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Fetch item details when the slug is available
    async function fetchItem() {
      try {
        const data = await getItemDetailsBySlug(params.slug);
        setItem(data.attributes);
        setActiveSlide(1);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      }
      setLoading(false);
    }
    fetchItem();
  }, [params.slug]);

  const scrollToSlide = (slideNumber: any) => {
    setActiveSlide(slideNumber);
    if (carouselRef.current) {
      carouselRef.current.children[slideNumber - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!item) return <div>No item found</div>;

  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto my-2 p-4 text-white">
        {/* Back Button */}
        <button
          className="btn btn-ghost mb-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="inline text-gray-200 -ml-1 mr-1" />
        </button>

        <section>
          {/* Item Name */}
          <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
          <div className="px-4 flex justify-between items-end">
            <section>
              {/* Address */}
              <div className="flex items-center mb-2">
                <MapPin className="inline text-accent -ml-1 mr-1" />
                <p>{item.address ? item.address : "Davao City"}</p>
              </div>
              {/* Category, Type */}
              <div className="flex items-center font-bold">
                <Milestone className="inline text-accent -ml-1 mr-1" />
                <p className="pr-2">
                  {item.date_sold !== null && (
                    <span className="text-warning">
                      Sold on {new Date(item.date_sold).toLocaleDateString()}
                    </span>
                  )}
                  {item.date_sold === null && (
                    <span className="text-primary">Available</span>
                  )}
                </p>
              </div>
            </section>
            <section>
              {" "}
              <div className="flex gap-1 items-center">
                <PhilippinePeso className="-ml-1 text-accent" />
                <p>Price Range: </p>

                {Array.from({ length: item.price }, (_, i) => (
                  <svg
                    key={`peso-${i}`}
                    width="14"
                    height="14"
                    viewBox="0 0 47 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M46.2614 10.4545V15.4545H0.125V10.4545H46.2614ZM46.2614 17.3182V22.3182H0.125V17.3182H46.2614ZM23.4432 31.7727H11.8068V23.8636H23.4432C25.3068 23.8636 26.8068 23.5076 27.9432 22.7955C29.0795 22.0682 29.9053 21.1364 30.4205 20C30.9356 18.8485 31.2008 17.6212 31.2159 16.3182C31.2008 14.9848 30.9356 13.7197 30.4205 12.5227C29.9053 11.3106 29.0795 10.3333 27.9432 9.59091C26.8068 8.83333 25.3144 8.45454 23.4659 8.45454H15.1477V47H5.42045V0.454544H23.4659C27.1932 0.454544 30.3674 1.15909 32.9886 2.56818C35.625 3.97727 37.6326 5.87879 39.0114 8.27273C40.4053 10.6515 41.1099 13.3182 41.125 16.2727C41.1099 19.1818 40.4053 21.8106 39.0114 24.1591C37.6174 26.4924 35.6023 28.3485 32.9659 29.7273C30.3447 31.0909 27.1705 31.7727 23.4432 31.7727Z"
                      fill="green"
                    />
                  </svg>
                ))}
              </div>
            </section>
          </div>
        </section>
        {/* Carousel */}
        <hr className="my-4" />
        <section className="mx-auto w-full max-w-[800px]">
          <div
            ref={carouselRef}
            className="carousel mx-auto w-full mb-4 rounded-md"
          >
            {item.images.data.map((image: any, index: number) => (
              <div
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
                key={`item-${index}`}
              >
                <Image
                  key={index}
                  src={image.attributes.url}
                  alt={image.attributes.alt}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <button
                    className="btn btn-circle"
                    onClick={() =>
                      scrollToSlide(
                        index === 0 ? item.images.data.length : index
                      )
                    }
                  >
                    ❮
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() =>
                      scrollToSlide(
                        index + 2 > item.images.data.length ? 1 : index + 2
                      )
                    }
                  >
                    ❯
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mb-4">
            {item.images.data.map((_: any, index: any) => (
              <span
                key={index}
                className={`inline-block h-2 w-2 rounded-full ${
                  index + 1 === activeSlide ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-hidden="true"
              ></span>
            ))}
          </div>
        </section>

        <div className="flex items-center mb-4 gap-2">
          <span className="flex items-center gap-2">
            <BiCategory className="text-accent" size={30} /> Category:
          </span>
          <div className="badge badge-outline">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </div>
          <div className="badge badge-outline">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </div>
        </div>

        {/* Description */}
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <article className="prose !prose-invert">
          <BlocksRenderer content={item.description} />
        </article>

        {/* Contact Information */}
        <section className=" bg-black bg-opacity-75 rounded-2xl py-6 px-12 mt-5 mx-auto">
          <div className="mb-4">
            <h1 className=" text-2xl font-bold">
              Get In <span className="text-secondary">Touch</span> With Us!
            </h1>
            <p className="mt-4 text">
              Interested in the property? Don&apos;t wait until your chance is
              over. Contact us now!
            </p>
          </div>
          <div>
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center text-center mt-4 text-xs sm:text-lg"
              >
                <div className="w-12">{detail.icon}</div>
                <div
                  className="text-wrap break-words break-all
                "
                >
                  {detail.text}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
};

export default Page;
