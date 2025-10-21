"use client";

import { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link href={`/products?category=${category._id}`}>
      <div className="border-2 rounded-2xl text-center p-6 h-44 cursor-pointer transition-transform hover:scale-105 bg-white bg-opacity-50 border-white">
        <Image
          src={category?.icon}
          width={120}
          height={120}
          alt={category?.name || "category icon"}
          className="mx-auto"
        />
        <h3 className="text-sm font-medium truncate mt-3 text-gray-700">
          {category?.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
