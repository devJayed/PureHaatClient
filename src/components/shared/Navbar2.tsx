import { getAllCategories } from "@/services/Category";
import Navbar2Client from "../ui/core/Navbar2Clinet";
import { Suspense } from "react";

// ✅ Server Component
const Navbar2 = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="hidden sm:block">
      <Suspense fallback={null}>
        <Navbar2Client categories={categories || []} />
      </Suspense>
    </div>
  );
};

export default Navbar2;
