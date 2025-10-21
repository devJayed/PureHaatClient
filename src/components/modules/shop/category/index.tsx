"use client";
import { ICategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";
import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/ui/core/NMModal/DeleteConfirmationModal";
import { toast } from "sonner";
import { deleteCategory } from "@/services/Category";
import UpdateCategoryModal from "./UpdateCategoryModal";

type TCategoriesProps = {
  categories: ICategory[];
};

const ManageCategories = ({ categories }: TCategoriesProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);

//   const handleUpdate = async (id: string, updates: Partial<ICategory>) => {
//   try {
//     const res = await updateCategory(id, updates);
//     if (res.success) {
//       toast.success("Category updated successfully!");
//       setEditingCategory(null);
//       // Optional: refresh categories list
//     } else {
//       toast.error(res.message);
//     }
//   } catch (err: any) {
//     toast.error(err.message);
//   }
// };

  const handleDelete = (data: ICategory) => {
    // console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        // console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<ICategory>[] = [
    // name
    {
      accessorKey: "name",
      header: () => <div className="min-w-[100px]">Category</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.icon}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    // description
    {
      accessorKey: "description",
      header: () => <div className="">Description</div>,
      cell: ({ row }) => {
        const description = row.original.description || "";

        return (
          <div className="min-w-full max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[300px] overflow-x-auto">
            {description ? (
              <p className="text-gray-700 text-sm">{description}</p>
            ) : (
              <span className="text-gray-400 italic">None</span>
            )}
          </div>
        );
      },
    },
    // parent
    {
      accessorKey: "parent",
      header: () => <div className="">Subcategory</div>,
      cell: ({ row }) => {
        const children = row.original?.children || [];

        return (
          <div className="min-w-full max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[300px] overflow-x-auto overflow-y-auto max-h-32 p-1">
            {children.length > 0 ? (
              <div className="text-gray-700 text-sm flex flex-col gap-1 w-max">
                {children.map((child: any, index: number) => (
                  <span key={child._id || index} className="truncate block">
                    {child?.name || "Unnamed"}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 italic">None</span>
            )}
          </div>
        );
      },
    },

    // isActive
    {
      accessorKey: "isActive",
      header: () => <div className="min-w-[80px]">isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    // action
    { 
      accessorKey: "action",
      header: () => <div className="min-w-[100px]">Action</div>,
      cell: ({ row }) => (
        <div className="flex space-x-3">
          <button
            className="text-blue-500"
            title="Edit"
            onClick={() => setEditingCategory(row.original)}
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            className="text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];
  // console.log({ categories });
  // console.log({ columns });
  // console.log({editingCategory});

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      <NMTable data={categories} columns={columns} />
      
      {/* Update Modal */}
      {editingCategory && (
        <UpdateCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategories;
