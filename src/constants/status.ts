import { IOrder } from "@/types";

// ✅ Payment Statuses
export const PAYMENT_STATUSES: Array<IOrder["paymentStatus"]> = [
  "Pending",
  "Processing",
  "Paid",
  "Cancelled",
  "Failed",
];

// ✅ Order Statuses
export const ORDER_STATUSES: Array<IOrder["status"]> = [
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
];