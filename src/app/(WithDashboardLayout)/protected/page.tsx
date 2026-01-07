"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/");
    } else {
      router.replace(`/protected/${user.role}/dashboard`);
    }
  }, [user, isLoading, router]);

  return null;
}
