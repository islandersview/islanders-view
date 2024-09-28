import SectionWrapper from "@/components/SectionWrapper";
import Link from "next/link";
import placeholderImg from "/public/4x5.jpg";
import Image from "next/image";
import logo from "/public/logo.png";
import logotext from "/public/logo-text.png";
import ItemListing from "@/types/item-listing";
import ItemCard from "@/components/ItemCard";

const images = [placeholderImg, placeholderImg, placeholderImg];

export default async function Home() {
  const res = await fetch(`${process.env.WEBSITE_URL}/api/items?featured=true`);
  let items: ItemListing[] | undefined;
  if (res) {
    const data = await res.json();
    items = data.data;
  }

  return (
    <main className="text-white">
      <section className="bg-gradient-to-bl from-[#191919] from-60% to-primary">
        <SectionWrapper className="md:flex items-center">
          <div className="px-6 py-24 md:py-0">
            <h1 className="text-6xl xl:text-7xl font-extrabold">
              Find Your Dream <span className="text-secondary">Home</span>
            </h1>
            <p className="mt-6 lg:text-xl">
              Welcome to Islander&apos;s View, your go-to for exceptional real
              estate and vehicles in Samal and beyond. Discover your dream home
              or reliable vehicle with our trusted listings and enjoy the
              seamless buying experience you deserve.
            </p>

            <Link href={"/offers"}>
              <button className="btn btn-primary mt-6 btn-wide font-bold">
                Explore Offers
              </button>
            </Link>
          </div>
          <div>
            <div className="carousel mx-auto w-full xl:max-w-[1400px]">
              {
                //carousel items
                images.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item relative w-full ${
                      index === 0 ? "active" : ""
                    }`}
                    id={`slide${index + 1}`}
                  >
                    <Image
                      src={image}
                      className="w-full"
                      alt="featured image"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <a
                        href={`#slide${index === 0 ? images.length : index}`}
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a
                        href={`#slide${
                          index === images.length - 1 ? 1 : index + 2
                        }`}
                        className="btn btn-circle"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </SectionWrapper>
      </section>
      <section className="bg-gradient-to-t from-[#191919] to-lime-500 to-70% text-black relative">
        {items && (
          <SectionWrapper>
            <div className="text-center px-4 pt-24 pb-48">
              <h2 className="text-4xl font-semibold">Exclusive Offers</h2>
              <p className="text-green-900 text-lg mt-2">
                Best Deals on Wheels and Real Estate
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mt-8 lg:flex-row flex-wrap">
                {/* temporary rendering, finalize after the card is final */}
                {items.map((item: ItemListing) => (
                  <Link
                    key={`item-${item.id}`}
                    href={`/offers/${item.attributes.slug}`}
                  >
                    <ItemCard
                      key={item.id}
                      item={item}
                      className="max-w-[400px] text-left text-white"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="custom-shape-divider-bottom-1722405483">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M1200 0L0 0 598.97 114.72 1200 0z"
                  className="shape-fill"
                ></path>
              </svg>
            </div>
          </SectionWrapper>
        )}
      </section>
      <section className="bg-gradient-to-br from-80% from-[#191919] to-primary">
        <SectionWrapper>
          <div className="px-4 py-24">
            <div className="flex items-center justify-center gap-4">
              <Image
                src={logo}
                className="h-10 sm:h-16 lg:h-20 xl:h-24 w-auto"
                alt="Islander's View Logo"
              />
              <Image
                src={logotext}
                alt="Islander's View Logo Text"
                className="h-4 sm:h-6 lg:h-8 xl:h-10 w-auto"
              />
            </div>
            <div>
              <p className="mx-auto max-w-[700px] mt-14 lg:text-lg">
                Welcome to Islander&apos;s View, your premier destination for
                discovering exceptional real estate and vehicles in the serene
                landscapes of Samal and beyond. Whether you’re searching for a
                tranquil retreat, a dream home, or a reliable vehicle, we offer
                a curated selection to meet your every need. Our platform is
                designed to connect you with trusted sellers, ensuring a
                seamless and enjoyable buying experience. Embrace the island
                life and explore our listings today—your perfect property or
                vehicle awaits at Islander&apos;s View.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}
