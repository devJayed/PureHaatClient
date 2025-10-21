"use client";

import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";

export function DeliverySidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col gap-2 p-4">
        <Link href="/delivery/dashboard">🏠 Dashboard</Link>
        <Link href="/delivery/my-orders">🚚 My Deliveries</Link>
        <Link href="/delivery/profile">👤 Profile</Link>
      </div>
    </Sidebar>
  );
}
