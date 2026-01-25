export const dynamic = "force-dynamic";

import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  // const { data, meta } = await getAllCategories();
  const data = (await getAllCategories())?.data ?? [];
  // console.log("Data:", { data });
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
