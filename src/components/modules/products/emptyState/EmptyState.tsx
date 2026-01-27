"use client";

import { Button } from "@/components/ui/button";
import { PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const EmptyState = ({
  title = "No products available",
  description = "There are currently no products under this category.",
  actionLabel = "Browse all products",
  actionHref = "/products",
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <PackageSearch className="h-8 w-8 text-gray-500" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>

      {/* Action Button */}
      <Button
        size="lg"
        className="
          bg-blue-300
          hover:bg-blue-400
          cursor-pointer hover:scale-105 
          text-white
          font-medium
          px-8
          rounded-md
          shadow-md
          transition
        "
        onClick={() => router.push(actionHref)}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;
