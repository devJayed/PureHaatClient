import { z } from "zod";

/**
 * Name rules:
 * - Min 2 chars
 * - Bangla + English letters only
 * - Spaces allowed between words
 * - No numbers, no symbols
 */
const nameRegex = /^[A-Za-z\u0980-\u09FF]+(?:\s+[A-Za-z\u0980-\u09FF]+)*$/;

export const cashOnDeliverySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .regex(nameRegex, "শুধু বাংলা ও ইংরেজি অক্ষর ব্যবহার করুন"),

  mobile: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক মোবাইল নম্বর দিন"),

  shippingAddress: z.string().trim().min(4, "ঠিকানা কমপক্ষে ৪ অক্ষরের হতে হবে"),
});
