import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Navbar2 from "@/components/shared/Navbar2";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Navbar2/>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
