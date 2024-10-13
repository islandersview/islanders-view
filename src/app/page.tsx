import SectionWrapper from "@/components/SectionWrapper";
import Link from "next/link";
import placeholderImg from "/public/4x5.jpg";
import Image from "next/image";
import logo from "/public/logo.png";
import logotext from "/public/logo-text.png";
import ItemListing from "@/types/item-listing";
import ItemCard from "@/components/ItemCard";
import { Metadata } from "next";

const images = [placeholderImg, placeholderImg, placeholderImg];

export const metadata: Metadata = {
  title: {
    absolute: "Islander's View",
    template: "%s | Islander's View",
  },
  description: "Find your dream properties here in Davao City!",
  icons: ["/logo.png"],
  keywords: [
    "real estate",
    "properties",
    "vehicles",
    "Davao City",
    "Samal",
    "Islander's View",
    "Islander's View Davao",
    "Islander's View Samal",
    "Islander's View Davao City",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Islander's View",
    description: "Find your dream properties here in Davao City!",
  },
};

export default async function Home() {
  const res = await fetch(
    `${process.env.WEBSITE_URL}/api/items?featured=true`,
    { cache: "no-store" }
  );
  let items: ItemListing[] | undefined;
  if (res) {
    const data = await res.json();
    items = data.data;
  }

  return (
    <main className="text-white">
      <section className="bg-[linear-gradient(to_top,rgba(49,84,44,0.9)10%,rgba(49,84,44,0)),url('/bg.jpg')] bg-cover bg-no-repeat min-h-[90vh] flex">
        <SectionWrapper className="md:flex items-center justify-end min-h-full mx-0 ml-auto">
          <div className="px-6 py-24 md:py-0 xl:text-right lg:px-20 max-w-[1200px] ml-auto">
            <h1 className="text-6xl xl:text-7xl font-extrabold">
              Find Your Dream <span className="text-secondary">Home</span>
            </h1>
            <p className="mt-6 lg:text-xl">
              Welcome to Islander&apos;s View, your go-to for exceptional real
              estate and vehicles in Davao and beyond. Discover your dream home
              or reliable vehicle with our trusted listings and enjoy the
              seamless buying experience you deserve.
            </p>

            <div className="flex xl:justify-end">
              <button className="btn btn-primary mt-6 btn-wide font-bold text-xl text-white">
                <Link href={"/offers"}>Explore Offers</Link>
              </button>
            </div>
          </div>
        </SectionWrapper>
      </section>

      <section className="bg-gradient-to-t from-[#191919] to-lime-500 to-70% text-black relative">
        {items && (
          <SectionWrapper className="mx-auto">
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
              <div className="flex justify-center">
              <button className="btn btn-primary mt-6 btn-wide font-bold text-xl text-white">
                <Link href={"/offers"}>View More Offers</Link>
              </button>
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
        <SectionWrapper className="mx-auto">
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
