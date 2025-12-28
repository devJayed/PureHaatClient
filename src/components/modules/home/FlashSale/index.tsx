import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductCard from "@/components/ui/core/ProductCard";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types";
import Link from "next/link";
import CountDown from "./CountDown";

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();

  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <NMContainer className="my-4">
        <div className="flex items-center justify-between mb-4">
          <div className="">
            <h2 className="text-xl font-bold">Flash Sale</h2>
          </div>

          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              All Collection
            </Button>
          </Link>
        </div>
        <div className="">
          <CountDown />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full mt-10">
          {products?.slice(0, 4)?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </NMContainer>
    </div>
  );
};

export default FlashSale;
