"use client";

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

export default function Address() {
  const dispatch = useAppDispatch();
  // const selectedCity = useAppSelector(citySelector);
  // const shippingAddress = useAppSelector(shippingAddressSelector);

  // const handleName = (address: string) => {
  //   dispatch(updateName(address));
  // };

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  // const handleShippingAddress = (address: string) => {
  //   dispatch(updateShippingAddress(address));
  // };

  return (
    <div className="">
      <h1 className="font-bold text-lg">
        শিপিং মেথড <span className="text-red-500">*</span>
      </h1>

      {/* City Select */}
      <div className="flex items-center border hover:border-amber-600 rounded-md overflow-hidden hover:text-amber-600">
        <div className="bg-gray-200 h-full px-4 py-3 flex items-center justify-center border-r">
          <Truck className="w-5 h-5" />
        </div>
        <Select onValueChange={handleCitySelect}>
          <SelectTrigger
            id="city"
            className="w-full py-5 border-0
    shadow-none
    focus:border-0
    focus:ring-0
    focus-visible:ring-0
    focus-visible:ring-offset-0"
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
    </div>
  );
}
