import ItemListing from "@/types/item-listing";
import { NextRequest, NextResponse } from "next/server";

//get all the data of a single item
export async function GET(
  req: NextRequest
) {
  // const slug = req.nextUrl.searchParams.get("slug");
  // if (!slug) {
  //   return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  // }

  // const item = await fetch(
  //   `${process.env.STRAPI_URL}/api/item-listings?populate=images&filters[slug][$eq]=${slug}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  //     },
  //   }
  // );
  // const data = await item.json();

  // if (!data || !data.data ||  data.data.length === 0) {
  //   return NextResponse.json({ error: "Item not found" }, { status: 404 });
  // }
  // return NextResponse.json(data.data[0], { status: 200 });
}
