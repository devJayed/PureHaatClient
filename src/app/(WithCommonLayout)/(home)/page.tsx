import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import { getNewToken } from "@/services/AuthService";

const HomePage = async () => {
  const result = await getNewToken();
  // console.log(result);

  return (
    <div>
      {/* converting category as nav bar */}
      <HeroSection />
      <Category />
      <FeaturedProducts />
      <FlashSale />
    </div>
  );
};

export default HomePage;
