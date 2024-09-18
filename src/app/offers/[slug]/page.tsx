"use client";

import React from 'react';

// Function to fetch item details from the API
const getItemDetailsBySlug = async (slug: string) => {
  const res = await fetch(`/api/item/?slug=${slug}`);
  const data = await res.json();
  return data;
};

// Page component
const Page = ({ params }: { params: { slug: string } }) => {
  const [item, setItem] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch item details when the slug is available
    async function fetchItem() {
      try {
        const data = await getItemDetailsBySlug(params.slug);
        console.log('Item details:', data);
        setItem(data.attributes);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
      }
      setLoading(false);
    }
    fetchItem();
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>No item found</div>;

  return (
    <div>
      <h1>{item.name}</h1>
      {/* Assuming there are images and other attributes to display */}
    </div>
  );
};

export default Page;
