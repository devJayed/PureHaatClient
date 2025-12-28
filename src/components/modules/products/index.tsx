"use client";

import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import { Suspense } from "react";
import FilterSidebar from "./filterSidebar";

const AllProducts = ({
  products,
  categoryName,
}: {
  products: IProduct[];
  categoryName: string;
}) => {
  return (
    <div className="flex gap-8 my-10 mt-18 sm:mt-0">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-84">
        <Suspense fallback={null}>
          <FilterSidebar />
        </Suspense>
      </div>
      {/* Right Section */}
      <div className="flex flex-col gap-y-4 w-full">
        {/* ✅ Dynamic Category Title */}
        <div className="w-full h-12 flex items-center  bg-blue-100 border border-blue-500 text-blue-700 rounded-md px-4">
          <h2 className="text-lg font-semibold ">{categoryName}</h2>
        </div>
        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
