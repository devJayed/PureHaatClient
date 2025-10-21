
import ViewProduct from "@/components/modules/shop/product/ViewProduct";
import { getSingleProduct } from "@/services/Product";

const ViewProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  // console.log({ productId });

  const { data: product } = await getSingleProduct(productId);

  // console.log({ product }); 

  return (
    <div className="flex justify-center items-center">
      <ViewProduct product={product} />
    </div>
  );
};

export default ViewProductPage;
