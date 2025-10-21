"use client";

import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import Logo from "@/assets/svgs/Logo";
import { IProduct } from "@/types";
import Image from "next/image";

export default function ViewProduct({ product }: { product: IProduct }) {
  const [imagePreview, setImagePreview] = useState<string[]>(
    product?.images.map((img) => img.url) || []
  );

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-5">
        <Logo />
        <h1 className="text-xl font-bold">View Product Info</h1>
      </div>

      {/* Basic Information */}
      <div className="flex justify-between items-center border-t border-b py-3 my-5">
        <p className="text-primary font-bold text-xl">Basic Information</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="font-semibold">Product Name:</p>
          <p>{product?.name}</p>
        </div>
        <div>
          <p className="font-semibold">SEO Title:</p>
          <p>{product?.seoTitle}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">SEO Description:</p>
          <div className="min-h-16"><p className="">{product?.seoDescription}</p></div>
        </div>
        <div>
          <p className="font-semibold">Price:</p>
          <p>$ {product?.price}</p>
        </div>
        <div>
          <p className="font-semibold">Category:</p>
          <p>{product?.category?.name}</p>
        </div>
        <div>
          <p className="font-semibold">Stock:</p>
          <p>{product?.stock}</p>
        </div>
        <div>
          <p className="font-semibold">Weight:</p>
          <p>{product?.weight} g</p>
        </div>
      </div>

      {/* Images */}
        <div>
        <div className="flex justify-between items-center border-t border-b py-3 my-5">
          <p className="text-primary font-bold text-xl">Images</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {imagePreview.map((url, idx) => (
            <div key={idx} className="relative w-24 h-24">
              <Image
                src={url}
                alt="product"
                fill
                className="rounded object-cover"
                sizes="96px" // optimize for 24*4 px (w-24 h-24)
                priority={idx === 0} // prioritize first image
              />
            </div>
          ))}
        </div>
      </div>

      {/* Available Sizes */}
      <div>
        <div className="flex justify-between items-center border-t border-b py-3 my-5">
          <p className="text-primary font-bold text-xl">Available Sizes</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {product?.availableSizes?.map((size, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm"
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div>
        <div className="flex justify-between items-center border-t border-b py-3 my-5">
          <p className="text-primary font-bold text-xl">Key Features</p>
        </div>
        <ul className="list-disc ml-6">
          {product?.keyFeatures?.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Specification */}
      <div>
        <div className="flex justify-between items-center border-t border-b py-3 my-5">
          <p className="text-primary font-bold text-xl">Specification</p>
        </div>
        <div className="space-y-2">
          {Object.entries(product?.specification || {}).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold">{key}</p>
              <p>{value as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
