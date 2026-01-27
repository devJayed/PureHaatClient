"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import { Carousel } from "flowbite-react";
import Image from "next/image";

export default function ProductCarousel() {
  return (
    <NMContainer>
      <div
        className="
        w-full
        rounded-lg
        overflow-hidden
      "
      >
        <Carousel
          slide
          indicators
          leftControl=" "
          rightControl=" "
          className="h-full"
        >
          {/* Slide 1 */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full aspect-[2/1]">
              <Image
                src="/banner/test1-banner.png"
                alt="Pure Honey"
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* You can add more slides here */}
          {/*
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full aspect-[2/1]">
              <Image
                src="/banner/test2-banner.png"
                alt="Organic Products"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
          */}
        </Carousel>
      </div>
    </NMContainer>
  );
}
