import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns Tailwind CSS color classes based on order/payment status.
 * Works for both paymentStatus and orderStatus fields.
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    // ✅ Shared statuses
    case "Completed":
    case "Paid":
      return "bg-green-100 text-green-700 border-green-300";

    case "Pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";

    case "Processing":
      return "bg-blue-100 text-blue-700 border-blue-300";

    case "Cancelled":
      return "bg-red-100 text-red-700 border-red-300";

    case "Failed":
      return "bg-red-50 text-red-700 border-red-300";

    // ⚙️ Default
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

