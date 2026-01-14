import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Navbar2 from "@/components/shared/Navbar2";
import { getAllCategories } from "@/services/Category";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data: categories } = await getAllCategories();
  return (
    <>
      <Navbar categories={categories} />
      <div className="mt-18 sm:mt-0">
        <Navbar2 />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
