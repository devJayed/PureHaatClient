"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

/**
 * ✅ Get My Shop Orders
 * Supports search, filter, sort, pagination (handled on backend)
 */
export const getMyShopOrders = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/my-shop-orders}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MY_SHOP_ORDERS"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.statusText}`);
    }

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// ✅ Update order
export const updateOrderStatus = async (
  orderId: string,
  data: { status: string }
): Promise<any> => {
  try {
    console.log("🟡 Service - Update order status loading...");
    console.log({ orderId, data });

    const token = await getValidToken();
    if (!token) {
      throw new Error("Authentication token is missing or invalid.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: token, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Failed to update order status:", errorText);
      throw new Error(
        `Failed to update order status. [${response.status}] ${errorText}`
      );
    }

    const result = await response.json();
    console.log("✅ Order status updated successfully:", result);

    revalidateTag("MY_SHOP_ORDERS");
    return result;
  } catch (error) {
    console.error("🚨 Error in updateOrderStatus:", error);
    throw error;
  }
};

