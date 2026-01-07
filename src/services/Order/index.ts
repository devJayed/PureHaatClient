"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

/**
 * ✅ Get My Shop Orders
 * Supports search, filter, sort, pagination (handled on backend)
 */
export const getMyShopOrders = async () => {
  const token = await getValidToken();
  console.log({ token });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/my-shop-orders`,
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
    console.log({ res });
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
  // console.log({"data body": JSON.stringify(data)});
  try {
    const token = await getValidToken();
    if (!token) {
      throw new Error("Authentication token is missing or invalid.");
    }

    const res = await fetch(
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
    // console.log({res});
    if (!res.ok) {
      const errorStatus = res.statusText;
      throw new Error(
        `[${res.status}] ${errorStatus}; You are not authorized to do so. `
      );
    }

    const result = await res.json();
    // console.log("✅ Order status updated successfully:", result);

    revalidateTag("MY_SHOP_ORDERS");
    return result;
  } catch (error) {
    console.error("🚨 Error in updateOrderStatus:", error);
    throw error;
  }
};

// updatePaymentStatus
export const updatePaymentStatus = async (
  orderId: string,
  data: { paymentStatus: string }
): Promise<any> => {
  try {
    const token = await getValidToken();
    if (!token) {
      throw new Error("Authentication token is missing or invalid.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}/payment-status`,
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
    // console.log({ res });
    if (!res.ok) {
      const errorStatus = res.statusText;
      throw new Error(
        `[${res.status}] ${errorStatus}; You are not authorized to do so. `
      );
    }

    const result = await res.json();
    // console.log("✅ Order status updated successfully:", result);

    revalidateTag("MY_SHOP_ORDERS");
    return result;
  } catch (error) {
    console.error("🚨 Error in updateOrderStatus:", error);
    throw error;
  }
};
