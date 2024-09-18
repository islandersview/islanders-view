"use client";

import SectionWrapper from "@/components/SectionWrapper";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const getItems = async (params: any) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/items?${query}`);
  const data = await res.json();
  return data;
};

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageCount, setPageCount] = useState(1); // Default to 1

  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedTypes, setSelectedTypes] = useState(
    searchParams.get("type")?.split(",").filter(Boolean) || []
  );

  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchData() {
        const params = {
          name: searchParams.get("name") || "",
          category: selectedCategories.filter(Boolean).join(","),
          type: selectedTypes.filter(Boolean).join(","),
          price: price || "",
          sort: sort || "",
          page: currentPage,
        };
        const data = await getItems(params);
        setItems(data.data);
        setPageCount(data.meta.pagination.pageCount);
      }
      fetchData();
    }, 300);

    return () => clearTimeout(timer); // Cleanup to avoid memory leaks
  }, [
    currentPage,
    searchParams,
    selectedCategories,
    selectedTypes,
    price,
    sort,
  ]);

  useEffect(() => {
    const newQuery = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      category: selectedCategories.join(","),
      type: selectedTypes.join(","),
      price: price,
      sort: sort,
      page: "1", // Reset to the first page when filters change
    });

    router.push(`/offers?${newQuery.toString()}`);
  }, [selectedCategories, selectedTypes, price, sort]); // Only run when these change

  const handleCheckboxChange = (key: any, value: any) => {
    if (key === "category") {
      setSelectedCategories((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (key === "type") {
      setSelectedTypes((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (key === "price") {
      setPrice(value);
    } else if (key === "sort") {
      setSort(value);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newQuery = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: newPage.toString(),
    });
    router.push(`/offers?${newQuery.toString()}`);
  };

  const handleSearch = () => {
    const newQuery = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      name: searchTerm,
    });
    router.push(`/offers?${newQuery.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5; // Limit of visible buttons before and after current page
    const sidePages = 2; // Number of side pages to show before and after current page

    // Always show the first page
    if (currentPage > sidePages + 1) {
      pages.push(1);
    }
    if (currentPage > sidePages + 2) {
      pages.push("...");
    }

    // Display some pages around the current page
    for (
      let i = Math.max(1, currentPage - sidePages);
      i <= Math.min(pageCount, currentPage + sidePages);
      i++
    ) {
      pages.push(i);
    }

    // Add ellipsis before the last page if needed
    if (currentPage < pageCount - sidePages - 1) {
      pages.push("...");
    }
    // Always show the last page
    if (currentPage < pageCount - sidePages) {
      pages.push(pageCount);
    }

    return pages;
  };

  const handleItemClick = (slug: string) => {
    // Navigate to the item's detail page
    router.push(`/offers/${slug}`);
  };

  return (
    <SectionWrapper>
      {/* Search bar */}
      <div className="flex max-w-2xl p-4 mb-2 mt-5 mx-auto">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered bg-white rounded-2xl w-full mr-2"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary text-white hover:btn-neutral rounded-2xl"
        >
          Search
        </button>
      </div>

      <div className="flex text-white p-4 max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <div className="w-1/3 py-6 px-4 bg-green-900 rounded-lg mr-4 h-min">
          {/* Categories */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Category</h4>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="sale"
                checked={selectedCategories.includes("sale")}
                onChange={(e) =>
                  handleCheckboxChange("category", e.target.value)
                }
                className="checkbox checkbox-secondary mr-2"
              />
              For Sale
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="rent"
                checked={selectedCategories.includes("rent")}
                onChange={(e) =>
                  handleCheckboxChange("category", e.target.value)
                }
                className="checkbox checkbox-secondary mr-2"
              />
              Rentals
            </label>
          </div>

          {/* Types */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Type</h4>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="real estate"
                checked={selectedTypes.includes("real estate")}
                onChange={(e) => handleCheckboxChange("type", e.target.value)}
                className="checkbox checkbox-secondary mr-2"
              />
              Real Estate
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="vehicle"
                checked={selectedTypes.includes("vehicle")}
                onChange={(e) => handleCheckboxChange("type", e.target.value)}
                className="checkbox checkbox-secondary mr-2"
              />
              Vehicle
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="other"
                checked={selectedTypes.includes("other")}
                onChange={(e) => handleCheckboxChange("type", e.target.value)}
                className="checkbox checkbox-secondary mr-2"
              />
              Other
            </label>
          </div>

          {/* Price */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Price</h4>
            <div className="rating gap-1">
              <input
                type="radio"
                name="price"
                value="1"
                className="mask mask-peso bg-secondary"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleCheckboxChange("price", e.target.value);
                }}
              />
              <input
                type="radio"
                name="price"
                value="2"
                className="mask mask-peso bg-secondary"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleCheckboxChange("price", e.target.value);
                }}
              />
              <input
                type="radio"
                name="price"
                value="3"
                className="mask mask-peso bg-secondary"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleCheckboxChange("price", e.target.value);
                }}
              />
              <input
                type="radio"
                name="price"
                value="4"
                className="mask mask-peso bg-secondary"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleCheckboxChange("price", e.target.value);
                }}
              />
              <input
                type="radio"
                name="price"
                value="5"
                className="mask mask-peso bg-secondary"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleCheckboxChange("price", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Sort By</h4>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                handleCheckboxChange("sort", e.target.value);
              }}
              className="p-2 border border-gray-300 rounded text-black w-full"
            >
              <option value="name:asc">Name: A-Z</option>
              <option value="name:desc">Name: Z-A</option>
              <option value="price:asc">Price Low to High</option>
              <option value="price:desc">Price High to Low</option>
              <option value="createdAt:asc">Newest First</option>
              <option value="createdAt:desc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                className="card card-normal bg-slate-100 text-black shadow-xl"
                key={`item-${index}`}
                onClick={() => handleItemClick(item.attributes.slug)}
              >
                <figure>
                  <img
                    src={item.attributes.images.data[0].attributes.url}
                    alt="Picture"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.attributes.name}
                    <div className="badge badge-secondary text-black">
                      {"₱ ".repeat(item.attributes.price)}
                    </div>
                  </h2>
                  <p>Insert Description Text Here</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      {item.attributes.category.charAt(0).toUpperCase() +
                        item.attributes.category.slice(1)}
                    </div>
                    <div className="badge badge-outline">
                      {item.attributes.type.charAt(0).toUpperCase() +
                        item.attributes.type.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 mb-8">
        <div className="join bg-slate-100">
          {/* Previous Button */}
          <button
            className={`join-item btn bg-slate-100 border-gray-50 ${
              currentPage === 1 && "btn-disabled"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          {/* Page Numbers with Ellipsis */}
          {renderPageNumbers().map((page, index) =>
            page === "..." ? (
              <button key={index} className="join-item btn btn-disabled">
                ...
              </button>
            ) : (
              <button
                key={index}
                className={`join-item btn btn-primary bg-slate-100 border-gray-50 ${
                  currentPage === page && "bg-primary border-primary"
                }`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            className={`join-item btn bg-slate-100 border-gray-50 ${
              currentPage === pageCount && "btn-disabled"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            »
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Page;

//The page parameters would be updated, refer to url based on postman api
//The page would be updated based on the parameters
//Whenever a user clicks an item card, a modal pops-up with the item details
//UseState if there are changes in the filter or sort, the page would be updated (UseEffect would run again)
