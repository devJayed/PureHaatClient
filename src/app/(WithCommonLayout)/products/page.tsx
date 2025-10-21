import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/Category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  // console.log({ query });
  const queriedCategory = query.category;

  const { data: categories } = await getAllCategories();

  // console.log(categories);

  const { data: products } = await getAllProducts(undefined, undefined, query);

  // ✅ Find the selected category
  const selectedCategory =
    queriedCategory &&
    categories?.find((c: ICategory) => c._id === queriedCategory);
  // console.log({ selectedCategory });

  return (
    <NMContainer>
      {/* <ProductBanner title="All Products" path="Home - Products" /> */}
      {/* Featured collection - all categories  */}
      {!queriedCategory && (
        <div>
          <h2 className="text-xl font-bold my-5">Featured Collection </h2>
          <div className="grid grid-cols-6 gap-6">
            {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
        </div>
      )}
      <AllProducts
        products={products}
        categoryName={selectedCategory ? selectedCategory.name : "All Products"}
      />
    </NMContainer>
  );
};

export default AllProductsPage;
