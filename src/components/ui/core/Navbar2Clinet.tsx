"use client";

import { Button } from "../button";
import Link from "next/link";
import { ICategory } from "@/types";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation"; // 👈 added usePathname
import clsx from "clsx";

interface Navbar2ClientProps {
  categories: ICategory[];
}

const Navbar2Client = ({ categories }: Navbar2ClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // 👈 get current route
  const selectedCategory = searchParams.get("category");

  // 👇 Make "All Products" active ONLY when exactly on /products (and no ?category)
  const isAllProductsActive =
    pathname === "/products" && selectedCategory === null;

  return (
    <header className="border-b w-full bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex justify-between items-center mx-auto h-16 px-3 overflow-x-auto">
        <nav className="flex flex-nowrap gap-2">
          {/* ✅ All Products */}
          <Link href="/products">
            <Button
              variant="outline"
              className={clsx(
                "rounded-full flex items-center gap-2 transition-all",
                isAllProductsActive
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
              )}
            >
              🛍️ All Products
            </Button>
          </Link>

          {/* ✅ Category buttons */}
          {categories.map((category) => {
            const isActive = selectedCategory === category._id;
            return (
              <Link
                key={category._id}
                href={`/products?category=${category._id}`}
              >
                <Button
                  variant="outline"
                  className={clsx(
                    "rounded-full flex items-center gap-2 transition-all",
                    isActive
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Image
                    src={category.icon}
                    width={20}
                    height={20}
                    alt={category.name || "category icon"}
                    className="rounded-full"
                  />
                  {category.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar2Client;
