"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";

import { IProduct } from "@/types";
import { ShoppingCart, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    // console.log({ product });
    dispatch(addProduct(product));
    toast.success(`${product.name} added to cart 🛍️`);
  };

  return (
    <Card className="p-3 min-w-[216px] bg-white transition-all duration-300 border border-gray-300 hover:border-yellow-500 hover:scale-103 shadow-md">
      <CardHeader className="relative p-0 h-48">
        <Link href={`/products/${product?._id}`} passHref>
          <Image
            src={
              product?.images[0].url ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            width={500}
            height={500}
            alt="product image"
            className="rounded-sm h-48 object-cover"
          />
          {product?.stock === 0 && (
            <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
              Out of Stock
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="font-bold cursor-pointer text-md"
          >
            {product?.name.length > 20
              ? product?.name?.slice(0, 20) + "..."
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-700">
            {product?.offerPrice ? (
              <>
                <span className="font-semibold text-xs mr-2 text-orange-400">
                  Tk {product?.offerPrice.toFixed(2)}
                </span>
                <del className="font-semibold text-xs">
                  Tk {product?.price.toFixed(2)}
                </del>
              </>
            ) : (
              <span className="font-semibold">
                Tk {product?.price.toFixed(2)}
              </span>
            )}
          </p>

          {/* <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <span className="text-sm font-medium text-gray-700">
              {product?.averageRating}
            </span>
          </div> */}
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <div className="flex flex-wrap gap-2 items-center justify-between w-full">
          <Button
            onClick={() => handleAddProduct(product)}
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="flex-1 min-w-[120px] cursor-pointer disabled:cursor-not-allowed hover:bg-gray-400 hover:text-white"
          >
            <ShoppingCart /> Add to Cart
          </Button>
          <Button
            onClick={() => {
              handleAddProduct(product); // 1) Add to cart
              router.push("/cart"); // 2) Redirect
            }}
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="flex-1 min-w-[120px] cursor-pointer w-full disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white"
          >
            <Wallet className="mr-2" />
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
