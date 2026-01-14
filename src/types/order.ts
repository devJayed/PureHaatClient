import { IProduct } from "./product";

export interface IOrder {
  _id: string;
  orderId: string;
  name: string;
  mobile: string;
  email?: string;
  products: IProduct[];
  coupon?: string | null;
  totalAmount: number;
  discount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: "Received" | "In-Processing" | "Completed" | "Cancelled";
  shippingAddress: string;
  paymentMethod: "COD" | "Card" | "Online";
  paymentStatus: "Pending" | "In-Processing" | "Paid" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}
