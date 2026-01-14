import ManageProducts from "@/components/modules/shop/product";
import { getAllProducts } from "@/services/Product";

const ManageProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  // console.log({searchParams});
  const { page } = await searchParams;
  // console.log({page});

  const { data = [], meta } = await getAllProducts(page, "3");
  // console.log({data, meta});
  
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default ManageProductsPage;
