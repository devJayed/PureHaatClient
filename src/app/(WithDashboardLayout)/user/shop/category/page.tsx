import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = async () => {
  // const { data, meta } = await getAllCategories();
  const res = await getAllCategories();
  const data = res?.data || []; // ✅ fallback if undefined
  // console.log({data});
  return (
    <div>
      <ManageCategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
