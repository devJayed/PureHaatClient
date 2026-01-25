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
    <Card className="min-w-[216px] bg-white transition-all duration-300 border border-gray-300 hover:border-yellow-500 shadow-md">
      <CardHeader className="p-0 flex justify-center">
        <Link
          href={`/products/${product?._id}`}
          className="relative block w-full max-w-[220px] aspect-square overflow-hidden rounded-sm"
        >
          <Image
            src={
              product?.images?.[0]?.url ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            alt={product?.name || "product image"}
            fill
            sizes="(max-width: 640px) 100vw, 220px"
            className="object-contain transition-transform duration-300 hover:scale-105"
          />

          {product?.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              Out of Stock
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className="p-0 mx-2 text-center">
        <Link href={`/products/${product?._id}`}>
          <CardTitle
            title={product?.name}
            className="font-bold cursor-pointer text-md"
          >
            {product?.name.length > 35
              ? product?.name?.slice(0, 35) + "..."
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-center mt-2 mx-2 text-center">
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

      <CardFooter className="p-0 mx-2">
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
