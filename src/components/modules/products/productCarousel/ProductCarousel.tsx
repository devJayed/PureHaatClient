"use client";

import Image from "next/image";
import { Carousel } from "flowbite-react";
import NMContainer from "@/components/ui/core/NMContainer";

export default function ProductCarousel() {
  return (
    <NMContainer>
      <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[36rem] xl:h-[50rem] rounded-lg overflow-hidden mt-4">
        <Carousel slide indicators leftControl=" " rightControl=" ">
          {/* Honey */}
          <div className="relative w-full h-full">
            <Image
              src="/banner/honey-banner.png"
              alt="Pure Honey"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Pure Ghee */}
          <div className="relative w-full h-full">
            <Image
              src="/banner/ghee-banner.png"
              alt="Pure Ghee"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Mustard Oil */}
          <div className="relative w-full h-full">
            <Image
              src="/banner/master-oil-banner.png"
              alt="Mustard Oil"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Dates */}
          <div className="relative w-full h-full">
            <Image
              src="/banner/dates-banner.png"
              alt="Premium Dates"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Carousel>
      </div>
    </NMContainer>
  );
}
