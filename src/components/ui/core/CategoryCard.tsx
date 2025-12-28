"use client";

import { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link href={`/products?category=${category._id}`} className="block">
      <div
        className="
          group
          flex flex-col items-center justify-center gap-2
          rounded-xl
          border-1 border-gray-200
          bg-white
          px-3
          transition-all duration-300
          hover:border-amber-500
          hover:bg-green-50
          hover:shadow-md
          cursor-pointer

          w-24 h-24
          sm:w-28 sm:h-28
          md:w-32 md:h-32
          lg:w-36 lg:h-36
        "
      >
        {/* Icon */}
        <div
          className="
            relative
            flex items-center justify-center
            mb-2
            w-12 h-12
            sm:w-14 sm:h-14
            md:w-16 md:h-16
          "
        >
          <Image
            src={category.icon}
            alt={category.name || "category icon"}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
          />
        </div>

        {/* Category Name */}
        <h3
          className="
            text-xs
            sm:text-sm
            font-medium
            text-gray-800
            text-center
            leading-tight
            line-clamp-2
          "
        >
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
