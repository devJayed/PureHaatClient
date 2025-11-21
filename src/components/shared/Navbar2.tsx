import { getAllCategories } from "@/services/Category";
import Navbar2Client from "../ui/core/Navbar2Clinet";

// ✅ Server Component
const Navbar2 = async () => {
  const { data: categories } = await getAllCategories();

  return (
    <div className="hidden sm:block">
      <Navbar2Client categories={categories || []} />
    </div>
  );
};

export default Navbar2;
