"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";

export function AdminSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col gap-2 p-4">
        <Link href="/admin/dashboard">🏠 Dashboard</Link>
        <Link href="/admin/products">🛍️ Products</Link>
        <Link href="/admin/orders">📦 Orders</Link>
        <Link href="/admin/users">👤 Users</Link>
      </div>
    </Sidebar>
  );
}
