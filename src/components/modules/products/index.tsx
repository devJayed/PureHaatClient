import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import FilterSidebar from "./filterSidebar";

const AllProducts = ({
  products,
  categoryName,
}: {
  products: IProduct[];
  categoryName: string;
}) => {
  return (
    <div className="flex gap-8 my-10">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-84">
        <FilterSidebar />
      </div>
      {/* Right Section */}
      <div className="flex flex-col gap-y-4 w-full">
        {/* ✅ Dynamic Category Title */}
        <div className="hidden lg:flex w-full h-12  items-center justify-between bg-gray-50 border rounded-md px-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {categoryName}
          </h2>
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
