"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { cities } from "@/constants/cities";
import {
  citySelector,
  shippingAddressSelector,
  updateCity,
  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Address() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <div className="border border-gray-200 bg-white rounded-xl shadow-sm p-5 md:p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-1">শিপিং অ্যাড্রেস</h1>
      <p className="text-gray-500 mb-6 text-sm">
        অর্ডার করতে আপনার তথ্য দিন 
      </p>

      {/* City Select */}
      <div className="mb-5">
        <Label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
         আপনার শহর সিলেক্ট করুনঃ 
        </Label>
        <Select onValueChange={handleCitySelect}>
          <SelectTrigger id="city" className="w-full">
            <SelectValue placeholder="Choose a city" />
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

      {/* Full Address */}
      <div>
        <Label htmlFor="full-address" className="mb-2 block text-sm font-medium text-gray-700">
          সম্পূর্ণ ঠিকানা লিখুনঃ
        </Label>
        <Textarea
          id="full-address"
          value={shippingAddress}
          onChange={(e) => handleShippingAddress(e.target.value)}
          placeholder="হাউস নং, রোড নং, এরিয়া, থানা ..."
          rows={5}
          className="resize-none"
        />
      </div>
    </div>
  );
}
