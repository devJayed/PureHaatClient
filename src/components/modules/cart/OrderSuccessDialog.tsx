"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function OrderSuccessDialog({ open, onClose, userName, totalAmount }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">
            🎉 Congratulations!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700">
            Dear <span className="font-semibold">{userName}</span>, your order has been placed successfully!
          </p>
          <p className="text-lg font-semibold">
            Total Amount: <span className="text-green-600">{totalAmount}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Our delivery team will contact you soon for confirmation.
          </p>
          <Button onClick={onClose} className="w-full mt-3">
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
