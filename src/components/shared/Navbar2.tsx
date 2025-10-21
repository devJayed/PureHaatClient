import { getAllCategories } from "@/services/Category";
import Navbar2Client from "../ui/core/Navbar2Clinet";


// ✅ Server Component — runs on backend before page loads
const Navbar2 = async () => {
  // Fetch data
  const { data: categories } = await getAllCategories();

  return <Navbar2Client categories={categories || []} />;
};

export default Navbar2;
