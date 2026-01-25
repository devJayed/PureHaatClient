"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NMTable } from "@/components/ui/core/NMTable/index";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";
import { deleteProduct } from "@/services/Product";
import { IProduct } from "@/types";
import { IMeta } from "@/types/meta";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DiscountModal from "./DiscountModal";
// ✅ Import ShadCN AlertDialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageProducts = ({
  products,
  meta,
}: {
  products: IProduct[];
  meta: IMeta;
}) => {
  // console.log({products}); ok
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  // handleView
  // const handleView = (product: IProduct) => {
  //   console.log("Viewing product:", product);
  // };

  // handleDelete
  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteProduct(productId);
      if (res?.success) {
        toast.success("✅ Product deleted successfully!");
      } else {
        toast.error(res?.message || "❌ Failed to delete product");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("⚠️ Something went wrong while deleting!");
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    // select the checkbox
    {
      // select
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      // Checkbox
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id),
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // name
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0].url}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    // category
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category.name}</span>,
    },
    // stock
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.stock}</span>,
    },
    // price
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    // offerPrice
    {
      accessorKey: "offerPrice",
      header: "Ofter Price",
      cell: ({ row }) => (
        <span>
          $ {row.original.offerPrice ? row.original.offerPrice.toFixed(2) : "0"}
        </span>
      ),
    },
    // action
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {/* view */}
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() =>
              router.push(
                `/protected/admin/shop/products/view-product/${row.original._id}`,
              )
            }
          >
            <Eye className="w-5 h-5" />
          </button>
          {/* update  */}
          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/protected/admin/shop/products/update-product/${row.original._id}`,
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>
          {/* Delete Confirmation Popup */}
          {/* <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="text-gray-600 hover:text-red-600"
                title="Delete"
              >
                <Trash className="w-5 h-5" />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete{" "}
                  <strong>{row.original.name}</strong> from your product list.
                  <br />
                  You cannot undo this action later.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(row.original._id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              router.push("/protected/admin/shop/products/add-product")
            }
            size="sm"
          >
            Add Product <Plus />
          </Button>
          <DiscountModal
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageProducts;
