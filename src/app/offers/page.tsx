"use client";

import ItemCard from "@/components/ItemCard";
import SectionWrapper from "@/components/SectionWrapper";
import ItemListing from "@/types/item-listing";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState<ItemListing[]>([]);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageCount, setPageCount] = useState(1); // Default to 1

  const [paginationData, setPaginationData] = useState<{
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }>();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedTypes, setSelectedTypes] = useState(
    searchParams.get("type")?.split(",").filter(Boolean) || []
  );

  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [sold, setSold] = useState(searchParams.get("sold") === "true");

  const getItems = useCallback(async (params: any) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/items?${query}`, { cache: "no-store" });
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchData() {
        setLoading(true);
        const params = {
          name: searchParams.get("name") || "",
          category: selectedCategories.filter(Boolean).join(","),
          type: selectedTypes.filter(Boolean).join(","),
          price: price || "",
          sort: sort || "",
          sold: sold ? "true" : "false",
          page: currentPage,
        };
        const data = await getItems(params);
        setItems(data.data);
        setPageCount(data.meta.pagination.pageCount);
        setPaginationData(data.meta.pagination);
        setLoading(false);
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
    sold,
    getItems,
  ]);

  useEffect(() => {
    const newQuery = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      category: selectedCategories.join(","),
      type: selectedTypes.join(","),
      price: price,
      sort: sort,
      sold: sold ? "true" : "false", // Add sold to query params
      page: "1", // Reset to the first page when filters change
    });

    router.push(`/offers?${newQuery.toString()}`);
  }, [selectedCategories, selectedTypes, price, sort, sold]); // Only run when these change

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
    } else if (key === "sold") {
      setSold((prev) => !prev); // Toggle the sold filter
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

  const handleSearch = useCallback(() => {
    const newQuery = new URLSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      name: searchTerm,
    });
    router.push(`/offers?${newQuery.toString()}`);
  }, [router, searchParams, searchTerm]);

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

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [searchTerm, handleSearch]);

  return (
    <SectionWrapper className="mx-auto">
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

      <div className="flex flex-col lg:flex-row gap-4 text-white p-4 max-w-screen-2xl mx-auto">
        {/* Sidebar */}
        <div className="xl:w-[300px] py-6 px-4 bg-green-900 rounded-lg mr-4 h-min">
          {/* Categories */}
          <div className="flex flex-wrap gap-6 mb-6">
            <div>
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

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={sold}
                  onChange={() => handleCheckboxChange("sold", "")}
                  className="checkbox checkbox-secondary mr-2"
                />
                <label>Hide Sold Items</label>
              </div>
            </div>
            {/* Price */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Price</h4>
              <div className="rating gap-1">
                <input
                  type="radio"
                  name="price"
                  value="1"
                  className="mask mask-peso bg-secondary"
                  onChange={(e) => {
                    {
                      /* Price */
                    }
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
                    </div>;
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
        {!loading && (
          <>
            <div className="w-auto">
              {items.length !== 0 && (
                <>
                  {paginationData && (
                    <div className="mb-2">
                      {searchParams.get("name") && (
                        <div>
                          Search:{" "}
                          <span className="font-bold">
                            {searchParams.get("name")}
                          </span>
                        </div>
                      )}
                      <div>
                        Showing{" "}
                        {paginationData.pageSize * (paginationData.page - 1) +
                          1}
                        -
                        {paginationData.pageSize * (paginationData.page - 1) +
                          items.length}{" "}
                        of {paginationData?.total}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item: ItemListing, index) => (
                      <ItemCard
                        item={item}
                        key={`item-card-${index}`}
                        onClick={() => handleItemClick(item.attributes.slug)}
                      />
                    ))}
                  </div>
                </>
              )}
              {items.length === 0 && (
                <div className="flex items-center justify-center">
                  <h2 className="text-2xl font-semibold text-gray-500">
                    No items found
                  </h2>
                </div>
              )}
            </div>
          </>
        )}
        {loading && (
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="flex w-60 flex-col gap-6 "
                key={`skeleton-${index}`}
              >
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount !== 0 && (
        <div className="flex justify-center mt-4 mb-8">
          <div className="join ">
            {/* Previous Button */}
            <button
              className={`join-item btn btn-outline-primary text-primary text-2xl ${
                currentPage === 1 && "btn-disabled"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>

            {/* Page Numbers with Ellipsis */}
            {(() => {
              if (pageCount === 1) {
                return (
                  <button className="join-item btn text-primary">1</button>
                );
              }
              const pageButtons = [];

              // Add the first page
              pageButtons.push({
                pageNumberDisplay: "1",
                pageNumberFunction: 1,
              });

              // Add ellipsis if necessary
              if (currentPage > 5) {
                pageButtons.push({
                  pageNumberDisplay: "...",
                  pageNumberFunction: currentPage - 1,
                }); // Navigate to the page above
              }

              // Determine the range of current and surrounding pages
              const startPage = Math.max(2, currentPage - 2);
              const endPage = Math.min(pageCount - 1, currentPage + 2);
              for (let i = startPage; i <= endPage; i++) {
                pageButtons.push({
                  pageNumberDisplay: i.toString(),
                  pageNumberFunction: i,
                });
              }

              // Add ellipsis and last page if necessary
              if (currentPage < pageCount - 3) {
                if (currentPage < pageCount - 4) {
                  pageButtons.push({
                    pageNumberDisplay: "...",
                    pageNumberFunction: currentPage + 1,
                  }); // Navigate to the page below
                }
              }
              pageButtons.push({
                pageNumberDisplay: pageCount.toString(),
                pageNumberFunction: pageCount,
              });

              return pageButtons.map((page, index) =>
                page.pageNumberFunction === null ? (
                  <button
                    key={index}
                    className="join-item btn text-primary"
                    onClick={() => handlePageChange(currentPage + 1)} // Default action (you can adjust this)
                  >
                    {page.pageNumberDisplay}
                  </button>
                ) : (
                  <button
                    key={index}
                    className={`join-item btn btn-outline-primary text-primary ${
                      currentPage === page.pageNumberFunction &&
                      "border-primary z-20"
                    }`}
                    onClick={() => handlePageChange(page.pageNumberFunction)}
                  >
                    {page.pageNumberDisplay}
                  </button>
                )
              );
            })()}

            {/* Next Button */}
            <button
              className={`join-item btn btn-outline-primary text-primary text-2xl ${
                currentPage === pageCount && "btn-disabled"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              »
            </button>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

//The page parameters would be updated, refer to url based on postman api
//The page would be updated based on the parameters
//Whenever a user clicks an item card, a modal pops-up with the item details
//UseState if there are changes in the filter or sort, the page would be updated (UseEffect would run again)
