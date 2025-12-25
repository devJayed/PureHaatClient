import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
    toast.success(`${product.name} removed from cart 🗑️`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 my-2 sm:my-4">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 sm:h-auto rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product?.images?.[0].url || "/placeholder.png"}
          height={200}
          width={200}
          alt="product"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-col justify-between flex-grow">
        {/* Product Name */}
        <h1 className="text-lg sm:text-xl font-semibold leading-tight">
          {product?.name}
        </h1>

        {/* Color + Stock */}
        <div className="flex flex-wrap gap-3 text-sm sm:text-base my-2">
          <p>
            <span className="text-gray-500">Color:</span>{" "}
            <span className="font-semibold">Black</span>
          </p>

          <p>
            <span className="text-gray-500">Stock:</span>{" "}
            <span className="font-semibold">{product?.stock}</span>
          </p>
        </div>

        <hr className="my-2" />

        {/* Price + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1">
          {/* Price */}
          <h2 className="text-base sm:text-lg font-semibold">
            Price:{" "}
            {product.offerPrice
              ? currencyFormatter(product.offerPrice)
              : currencyFormatter(product.price)}
          </h2>

          {/* Quantity & Trash */}
          <div className="flex items-center gap-2 sm:gap-3">
            <p className="text-gray-500 font-semibold hidden sm:block">Qty</p>

            <Button
              onClick={() => handleDecrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-md"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <p className="font-semibold text-lg px-2">
              {product?.orderQuantity}
            </p>

            <Button
              onClick={() => handleIncrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-md"
            >
              <Plus className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => handleRemoveProduct(product._id)}
              variant="outline"
              className="size-8 rounded-md"
            >
              <Trash className="text-red-500/70 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
