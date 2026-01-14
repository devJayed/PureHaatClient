import {
  Settings,
  ShoppingCart,
  SquareTerminal,
  Truck,
  Users,
} from "lucide-react";

export type Role = "admin" | "delivery" | "user";

export const sidebarMenuByRole: Record<Role, any[]> = {
  user: [
    {
      title: "Dashboard",
      url: "/protected/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [{ title: "Profile", url: "/profile" }],
    },
  ],

  admin: [
    {
      title: "Dashboard",
      url: "/protected/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Shop",
      url: "/protected/admin/shop/products",
      icon: ShoppingCart,
      items: [
        { title: "Products", url: "/protected/admin/shop/products" },
        { title: "Category", url: "/protected/admin/shop/category" },
        { title: "Subcategory", url: "/protected/admin/shop/subcategory" },
        { title: "Orders", url: "/protected/admin/shop/orders" },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      disabled: true,
    },
  ],

  delivery: [
    {
      title: "Dashboard",
      url: "/protected/delivery/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Deliveries",
      url: "/protected/delivery/shop/deliveries",
      icon: Truck,
    },
  ],
};
