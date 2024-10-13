"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function PropertyLinkButton({
  propertyLink,
  className,
}: {
  propertyLink: string;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(propertyLink)
      .then(() => {
        setIsCopied(true);
        // Reset the copied state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`btn text-white btn-sm text-xs my-2 ${className}`}
    >
      {isCopied ? (
        <span className="flex gap-1 items-center">
          <Check /> Copied!
        </span>
      ) : (
        <span className="flex gap-1 items-center">
          <Copy /> Copy Property Link
        </span>
      )}
    </button>
  );
}
