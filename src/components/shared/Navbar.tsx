"use client";

import { Button } from "../ui/button";
import { Heart, LogOut, Menu, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import Logo from "@/assets/svgs/Logo";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Navbar({ categories }: { categories: any[] }) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const cartProducts = useAppSelector(orderedProductsSelector);
  const totalItems = cartProducts.reduce(
    (total, item) => total + item.orderQuantity,
    0
  );

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    router.push("/");
  };

  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">

        {/* LOGO */}
        <div className="items-center py-2">
          <Logo />
        </div>

        {/* ===== Desktop Navigation (hidden on mobile) ===== */}
        <nav className="hidden sm:flex gap-3 items-center">
          <Link href="/cart" className="relative">
            <Button variant="outline" className="rounded-full p-0 size-10">
              <ShoppingBag />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>My Shop</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer text-white"
                >
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* ===== Mobile Hamburger (visible only on small screens) ===== */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            {/* Sidebar Content */}
            <SheetContent side="left" className="w-64 p-4">
              <h2 className="text-lg font-bold mb-4">Categories</h2>

              <ul className="space-y-2">
                {safeCategories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="block py-2 px-3 rounded hover:bg-gray-100"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <hr className="my-4" />

              {/* Cart + Auth options */}
              <Link href="/cart" className="flex items-center gap-2 py-2">
                <ShoppingBag />
                <span>Cart ({totalItems})</span>
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-red-600 font-medium"
                >
                  <LogOut />
                  Logout
                </button>
              ) : (
                <Link href="/login" className="block py-2">
                  Login
                </Link>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

