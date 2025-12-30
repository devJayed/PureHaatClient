import { getAllCategories } from "@/services/Category";
import { Suspense } from "react";
import Navbar2Client from "../ui/core/Navbar2Clinet";

// ✅ Server Component
const Navbar2 = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="hidden sm:block mb-4">
      <Suspense fallback={null}>
        <Navbar2Client categories={categories || []} />
      </Suspense>
    </div>
  );
};

export default Navbar2;
