// /user/shop/subcategory/page.tsx
"use client";
import ManageSubcategories from "@/components/modules/shop/subcategory";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/Category";

const ProductCategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const { data = [] } = await getAllCategories();
      setCategories(data);
    })();
  }, []);

  return <ManageSubcategories categories={categories} />;
};

export default ProductCategoryPage;
