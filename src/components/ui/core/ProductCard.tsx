"use client";

import { toast } from "sonner";
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

import { IProduct } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    // console.log({ product });
    dispatch(addProduct(product));
    toast.success(`${product.name} added to cart 🛍️`);
  };

  return (
    <Card className="p-3 min-w-[216px]">
      <CardHeader className="relative p-0 h-48">
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
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="font-semibold cursor-pointer text-sm"
          >
            {product?.name.length > 20
              ? product?.name?.slice(0, 20) + "..."
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
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
            className="flex-1 min-w-[120px]"
          >
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
