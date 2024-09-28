import { NextRequest, NextResponse } from "next/server";

//get all items with pagination, with filter and sort
export async function GET(req: NextRequest) {
  // // {{STRAPI_URL}}/api/item-listings?populate=images&filters[category][$eq]=sale&filters[type][$eq]=real estate&filters[price][$eq]=3&filters[name][$containsi]=sample&sort=name:asc&pagination[page]=1

  // const category = req.nextUrl.searchParams.get("category");
  // const type = req.nextUrl.searchParams.get("type");
  // const price = req.nextUrl.searchParams.get("price");
  // const name = req.nextUrl.searchParams.get("name");
  // const sort = req.nextUrl.searchParams.get("sort");
  // const page = req.nextUrl.searchParams.get("page");
  // const isFeatured = req.nextUrl.searchParams.get("featured");

  // //use javascript url object

  // const url = new URL(`${process.env.STRAPI_URL}/api/item-listings`);
  // url.searchParams.append("populate", "images");

  // if (category) {
  //   if (category === "rent" || category === "sale") {
  //     url.searchParams.append("filters[category][$eq]", category);
  //   }
  // }

  // if (type) {
  //   const arr = type.split(",");
  //   for (let i = 0; i < arr.length; i++) {
  //     url.searchParams.append(`filters[type][$in][${i}]`, arr[i]);
  //   }
  // }

  // if (price) {
  //   url.searchParams.append("filters[price][$eq]", price);
  // }

  // if (name) {
  //   url.searchParams.append("filters[name][$containsi]", name);
  // }

  // if (sort) {
  //   url.searchParams.append("sort", sort);
  // }

  // if (isFeatured) {
  //   url.searchParams.append("filters[is_featured][$eq]", isFeatured);
  // }

  // if (page) {
  //   url.searchParams.append("pagination[page]", page);
  //   url.searchParams.append("pagination[pageSize]", "9")
  // }

  // const response = await fetch(url.toString(), {
  //   headers: {
  //     Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  //   },
  // });

  // if (!response.ok) {
  //   return NextResponse.json(
  //     { error: "Failed to fetch items" },
  //     { status: 500 }
  //   );
  // }

  // const data = await response.json();

  // if (!data) {
  //   return NextResponse.json({ error: "No items found" }, { status: 404 });
  // }

  // return NextResponse.json(data, { status: 200 });
}
