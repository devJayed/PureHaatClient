import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full">
      <Spinner variant="bars" className="text-green-500" size={64} />
    </div>
  );
}
