import { getAllCategories } from "@/services/Category";

import ManageSubcategories from "@/components/modules/shop/subcategory";

const ProductCategoryPage = async () => {
    
  const { data, meta } = await getAllCategories();
  // console.log({data});
  return (
    <div>
      <ManageSubcategories categories={data} />
    </div>
  );
};

export default ProductCategoryPage;
