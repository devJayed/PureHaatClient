"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  couponSelector,
  fetchCoupon,
  subTotalSelector,
} from "@/redux/features/cartSlice";

export default function Coupon() {
  const subTotal = useAppSelector(subTotalSelector);
  const { isLoading, code } = useAppSelector(couponSelector);

  const dispatch = useAppDispatch();

  const form = useForm();
  const couponInput = form.watch("coupon");

  const handleRemoveCoupon = () => {
    form.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await dispatch(
        fetchCoupon({ couponCode: data.coupon, subTotal })
      ).unwrap();
      // console.log(res, "inside component");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="border border-gray-200 bg-white rounded-lg shadow-sm col-span-4 p-6">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">কুপন ব্যবহার করুন</h1>
        <p className="text-gray-500">যদি আপনার কুপন থাকে</p>

        <Form {...form}>
          <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="rounded-full"
                      placeholder="প্রোমো / কুপন কোড"
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-3 mt-3">
              <Button
                disabled={!couponInput}
                type="submit"
                className="w-full text-xl font-semibold py-5 "
              >
                {isLoading ? "Applying..." : "Apply"}
              </Button>
              {couponInput && (
                <Button
                  onClick={handleRemoveCoupon}
                  variant="outline"
                  className="bg-red-100 rounded-full size-10"
                >
                  <Trash size={24} className="text-red-500" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
