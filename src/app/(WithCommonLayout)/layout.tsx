import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Navbar2 from "@/components/shared/Navbar2";
 import { getAllCategories } from "@/services/Category";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data: categories } = await getAllCategories();
  return (
    <>
      <Navbar categories={categories} />
      <Navbar2/>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
