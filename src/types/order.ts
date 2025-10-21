import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrder {
  _id: string;
  orderId: string;
  user: IUser;
  products: IProduct[];
  coupon?: string | null;
  totalAmount: number;
  discount: number;
  deliveryCharge: number;
  finalAmount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  shippingAddress: string;
  paymentMethod: "COD" | "Card" | "Online";
  paymentStatus: "Pending" | "Paid" | "Failed";
  createdAt: string;
  updatedAt: string;
}
