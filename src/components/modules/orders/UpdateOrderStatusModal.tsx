// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { IOrder } from "@/types";

// const STATUSES: Array<IOrder["status"]> = [
//   "Pending",
//   "Processing",
//   "Completed",
//   "Cancelled",
// ];

// type Props = {
//   order: IOrder;
//   onClose: () => void;
//   onSave: (id: string, status: string) => void;
// };

// export default function UpdateOrderStatusModal({
//   order,
//   onClose,
//   onSave,
// }: Props) {
//   const [selectedStatus, setSelectedStatus] = useState<IOrder["status"]>(
//     order.status
//   );

//   const handleSave = () => {
//     if (selectedStatus !== order.status) {
//       onSave(order._id, selectedStatus);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent className="max-w-sm">
//         <DialogHeader>
//           <DialogTitle className="text-lg font-semibold">
//             Update Order Status
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           {/* Status Dropdown */}
//           <div>
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium mb-2 text-gray-700"
//             >
//               Select new status
//             </label>
//             <select
//               id="status"
//               className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
//               value={selectedStatus}
//               onChange={(e) =>
//                 setSelectedStatus(e.target.value as IOrder["status"])
//               }
//             >
//               {STATUSES.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSave}
//               disabled={selectedStatus === order.status}
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
