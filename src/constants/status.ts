import { IOrder } from "@/types";

// ✅ Payment Statuses
export const PAYMENT_STATUSES: Array<IOrder["paymentStatus"]> = [
  "Pending",
  "In-Processing",
  "Paid",
  "Cancelled",
];

// ✅ Order Statuses
export const ORDER_STATUSES: Array<IOrder["status"]> = [
  "Received",
  "In-Processing",
  "Completed",
  "Cancelled",
];
