"use client";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllCategories, updateCategory } from "@/services/Category";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ICategory } from "@/types";

type TUpdateCategoryModalProps = {
  category: ICategory | null;
  onClose: () => void;
};

const UpdateCategoryModal = ({
  category,
  onClose,
}: TUpdateCategoryModalProps) => {
  //   console.log({ category });
  //   console.log({ onClose });
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const form = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      parent: "none",
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  // ✅ Re-populate when category changes
  useEffect(() => {
    reset({
      name: category?.name || "",
      description: category?.description || "",
      //   parent: category?.parent?._id || "none",
    });

    if (category?.icon) {
      setImagePreview([category.icon]); // preload existing image
    }
  }, [category, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Invalid category
      if (!category?._id) return;

      const { name, description } = data;

      const dataWithoutParent = {
        name,
        description,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(dataWithoutParent));
      if (imageFiles.length > 0) {
        formData.append("icon", imageFiles[0] as File);
      }

      // console.log({ formData });

      const res = await updateCategory(category._id, formData);

      if (res?.success) {
        toast.success("Category updated successfully!");
        onClose(); // close modal
      } else {
        toast.error(res?.message || "Update failed!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={!!category} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Parent */}
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    disabled={true}
                    onValueChange={(val) =>
                      field.onChange(val === "none" ? null : val)
                    }
                    value={field.value ?? "none"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Parent Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {/* ✅ Use "none" instead of "" */}
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description & Icon */}
            <div className="flex items-center justify-between mt-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 w-72"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="mt-8"
                />
              ) : (
                <div className="mt-8">
                  <NMImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Icon"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
