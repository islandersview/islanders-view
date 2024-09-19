type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small?: ImageFormat;
    thumbnail?: ImageFormat;
    large?: ImageFormat;
    medium?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
};

type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

type ItemAttributes = {
  name: string;
  address: string;
  description: any; // description can be of any type
  category: string;
  type: string;
  date_sold: string | null;
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  price: number;
  images: {
    data: ImageData[];
  };
};

type ItemListing = {
  id: number;
  attributes: ItemAttributes;
};

export default ItemListing;
