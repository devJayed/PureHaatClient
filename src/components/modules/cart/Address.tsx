"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/constants/cities";
import { updateCity } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Truck } from "lucide-react";
import { Control } from "react-hook-form";

type Props = {
  control: Control<any>;
};

export default function Address({ control }: Props) {
  const dispatch = useAppDispatch();

  return (
    <FormField
      control={control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold text-lg">
            শিপিং মেথড <span className="text-red-500">*</span>
          </FormLabel>

          <FormControl>
            <div
              className="
               group flex items-center
            border rounded-md overflow-hidden
            transition-colors
            hover:border-amber-600
            focus-within:border-amber-600
            focus-within:ring-0
              "
            >
              {/* Icon */}
              <div className="bg-gray-200 px-4 py-3 border-r flex items-center justify-center">
                <Truck
                  className="w-5 h-5 text-gray-600
        transition-colors
        group-hover:text-amber-600
        group-focus-within:text-amber-600"
                />
              </div>

              {/* Select */}
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value); // ✅ RHF
                  dispatch(updateCity(value)); // ✅ Redux
                }}
              >
                <SelectTrigger
                  id="city"
                  className="
                    w-full py-5 border-0
                    shadow-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                  "
                >
                  <SelectValue placeholder="শিপিং মেথড সিলেক্ট করুণ" />
                </SelectTrigger>

                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
