"use client";

import emptyCart from "@/assets/empty-cart.png";
import {
  CartProduct,
  orderedProductsSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import CartProductCard from "./CartProductCard";
export default function CartProducts() {
  const products = useAppSelector(orderedProductsSelector);

  return (
    <div
      className="border-[1.5px] hover:text bg-white  p-5 md:p-8
      hover:border-1
     hover:border-amber-600
    "
    >
      {products.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">আপনার কার্ট খালি</p>
          <p className="mt-2">
            আপনার কার্টে কোন প্রোডাক্ট নাই, যে প্রোডাক্টটি কিনতে চান সেই
            প্রডাক্ট কার্টে অ্যাড করুন।
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {products?.map((product: CartProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
