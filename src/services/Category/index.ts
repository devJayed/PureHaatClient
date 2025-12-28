"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// create category
export const createCategory = async (data: FormData) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      cache: "no-store",
      next: {
        tags: ["CATEGORY"],
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status);
      return { data: [] };
    }
    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      console.error("Invalid JSON returned:", text);
      return { data: [] };
    }
  } catch (error) {
    console.error("Category fetch error:", error);
    return { data: [] };
  }
};

// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("CATEGORY"); // calls getAllCategory again
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// ✅ Update category
export const updateCategory = async (
  categoryId: string,
  data: FormData
): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: data,
      }
    );

    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
