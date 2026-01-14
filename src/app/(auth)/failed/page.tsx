import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

const FailPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-3 rounded-full mb-5">
            <X className="size-40 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Unfortunately, your payment could not be processed. Please try again
            or contact support if the issue persists.
          </p>

          {/* Back to shopping */}
          <Button asChild>
            <Link href="/products">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FailPage;
