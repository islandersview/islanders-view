import ItemListing from "@/types/item-listing";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface Props {
  onClick?: () => void;
  item: ItemListing;
  className?: string;
}

export default function ItemCard({ onClick, item, className }: Props) {
  return (
    <div
      className={`card card-normal shadow-2xl bg-[#14532d] hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      <figure className="overflow-hidden">
        <Image
          src={item.attributes.images.data[0].attributes.url}
          alt="Picture"
          className="transition-transform duration-300 ease-in-out transform hover:scale-110" // Add transition and transform classes
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.attributes.name}
          {item.attributes.sold && (
            <span className="badge badge-outline badge-warning ml-2">Sold</span>
          )}
        </h2>
        <p className="mb-2">
          <MapPin className="inline text-accent -ml-1 mr-1" />
          {item.attributes.address ? item.attributes.address : "Davao City"}
        </p>
        <section className="flex items-center gap-2 justify-between flex-wrap">
          <div className="flex gap-2">
            {Array.from({ length: item.attributes.price }, (_, i) => (
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
                  fill="#ffbe01"
                />
              </svg>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="badge badge-outline">
              {item.attributes.category.charAt(0).toUpperCase() +
                item.attributes.category.slice(1)}
            </div>
            <div className="badge badge-outline">
              {item.attributes.type.charAt(0).toUpperCase() +
                item.attributes.type.slice(1)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
