"use client";

import Logo from "@/assets/svgs/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { logout } from "@/services/AuthService";
import { LogOut, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Navbar2Client from "../ui/core/Navbar2Clinet";
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
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-400 z-50">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        {/* LOGO */}
        <div className="items-center pt-3 pb-1">
          <Link href="/" className="inline-block">
            <div className="inline-block transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <Logo />
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          {/* ===== Desktop Navigation (hidden on mobile) ===== */}
          <nav className="flex gap-3 items-center cursor-pointer">
            <Link href="/cart" className="relative">
              <Button
                variant="outline"
                className="rounded-full p-0 size-10 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-yellow-500 hover:border-yellow-500"
              >
                <ShoppingBag />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Section - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-3">
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
                      className="flex items-center gap-2 py-2 px-3 rounded-full text-red-600 font-medium transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-red-700 hover:border-red-400 border border-transparent"
                    >
                      <LogOut />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-yellow-500 hover:border-yellow-500"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* ===== Mobile Hamburger (visible only on small screens) ===== */}
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-yellow-500 hover:border-yellow-500"
                >
                  <Menu />
                </Button>
              </SheetTrigger>

              {/* Sidebar Content */}
              <SheetContent side="left" className="w-64 p-4 mt-16">
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <Navbar2Client categories={categories || []} />

                <hr className="my-4" />

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-yellow-500 hover:border-yellow-500"
                  >
                    <LogOut />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-md hover:text-yellow-500 hover:border-yellow-500"
                  >
                    Login
                  </Link>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
