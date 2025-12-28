import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import Link from "next/link";
// import { connection } from "next/server";

const Category = async () => {
  // await connection();
  const categories = (await getAllCategories())?.data ?? [];

  return (
    <NMContainer className="my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            All Products
          </Button>
        </Link>
      </div>
      <div
        className="grid grid-cols-3
      sm:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-4 mb-8 items-center justify-center"
      >
        {categories?.map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
    </NMContainer>
  );
};

export default Category;
