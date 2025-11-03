import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import { Suspense } from "react";
// import { getNewToken } from "@/services/AuthService";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  // const result = await getNewToken();
  // console.log(result);

  return (
    <div>
      {/* converting category as nav bar */}

      <Suspense fallback={<div>Hero section ...</div>}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Category />
      </Suspense>
      <Suspense fallback={<div>Loading featured products...</div>}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={<div>Loading flash sale...</div>}>
        <FlashSale />
      </Suspense>
    </div>
  );
};

export default HomePage;
