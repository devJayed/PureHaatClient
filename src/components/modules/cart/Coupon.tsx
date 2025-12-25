"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  couponSelector,
  // fetchCoupon,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Coupon() {
  const subTotal = useAppSelector(subTotalSelector);
  const { isLoading, code } = useAppSelector(couponSelector);

  const dispatch = useAppDispatch();

  const form = useForm();
  const couponInput = form.watch("coupon");

  const handleRemoveCoupon = () => {
    form.reset();
  };

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   try {
  //     const res = await dispatch(
  //       fetchCoupon({ couponCode: data.coupon, subTotal })
  //     ).unwrap();
  //     // console.log(res, "inside component");
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  return (
    // <div className="border border-gray-200 bg-white  p-2 md:p-3">
    <div className="bg-white p-2 md:p-3">
      <div className="flex flex-col justify-between h-full">
        {/* <h1 className="text-2xl font-bold">কুপন ব্যবহার করুন</h1> */}
        {/* <p className="text-gray-500">যদি আপনার কুপন থাকে</p> */}

        <Form {...form}>
          {/* <form className="mt-3" onSubmit={form.handleSubmit(onSubmit)}></form> */}
          <form className="">
            <div className="flex items-center align-center w-full gap-2">
              {/* coupon input  */}
              <FormField
                control={form.control}
                name="coupon"
                render={({ field }) => (
                  <FormItem className="w-8/12">
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md py-5"
                        placeholder="প্রোমো / কুপন কোড"
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Apply Button */}
              <div className="flex w-4/12">
                <Button
                  disabled={!couponInput}
                  type="submit"
                  className={`w-full
    bg-gradient-to-r from-amber-500 to-amber-600
    hover:from-amber-600 hover:to-amber-700
    text-white
    text-lg font-semibold
    py-5
    rounded-xl
    shadow-md hover:shadow-lg
    transition-all duration-200 ease-in-out
    cursor-pointer
    active:scale-[0.98]
    focus:outline-none focus:ring-1 focus:ring-amber-400 focus:ring-offset-1
      ${couponInput ? "w-9/12" : "w-10/12"}
    `}
                >
                  {isLoading ? "Applying..." : "Apply"}
                </Button>
                {couponInput && (
                  <Button
                    onClick={handleRemoveCoupon}
                    variant="outline"
                    className="bg-red-100 rounded-full size-8 ml-2"
                  >
                    <Trash size={24} className="text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
