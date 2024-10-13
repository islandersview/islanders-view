"use client";
import ItemListing from "@/types/item-listing";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Carousel({ item }: { item: ItemListing }) {
  const [activeSlide, setActiveSlide] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (slideNumber: any) => {
    setActiveSlide(slideNumber);
    if (carouselRef.current) {
      carouselRef.current.children[slideNumber - 1].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1000px]">
      <div
        ref={carouselRef}
        className="carousel mx-auto w-full mb-4 rounded-md"
      >
        {item.attributes.images.data.map((image: any, index: number) => (
          <div
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
            key={`item-${index}`}
          >
            <Image
              key={index}
              src={image.attributes.url}
              alt={`${item.attributes.name} Image`}
              width={500}
              height={500}
              className="w-full h-auto"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                className="btn btn-circle"
                onClick={() =>
                  scrollToSlide(
                    index === 0 ? item.attributes.images.data.length : index
                  )
                }
              >
                ❮
              </button>
              <button
                className="btn btn-circle"
                onClick={() =>
                  scrollToSlide(
                    index + 2 > item.attributes.images.data.length
                      ? 1
                      : index + 2
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
        {item.attributes.images.data.map((_: any, index: any) => (
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
  );
}
