"use client";

import Logo from "@/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/services/Category";
import { addProduct } from "@/services/Product";
import { ICategory } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddProductsForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [{ value: "" }],
      price: "",
      category: "",
      subcategory: "",
      stock: "",
      weight: "",
      availableSizes: [{ value: "" }],
      keyFeatures: [{ value: "" }],
      specification: [{ key: "", value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendSize, fields: sizeFields } = useFieldArray({
    control: form.control,
    name: "availableSizes",
  });

  const addSize = () => {
    appendSize({ value: "" });
  };

  // console.log({ sizeFields });

  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });
  const addFeatures = () => {
    appendFeatures({ value: "" });
  };

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });
  const addSpec = () => {
    appendSpec({ key: "", value: "" });
  };

  const { append: appendSeoKeyword, fields: seoKeywordFields } = useFieldArray({
    control: form.control,
    name: "seoKeywords",
  });
  const addSeoKeyword = () => {
    appendSeoKeyword({ value: "" });
  };

  // console.log(specFields);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([getAllCategories()]);

      setCategories(categoriesData?.data);
    };

    fetchData();
  }, []);
  // console.log({ categories });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log({ data });

    const seoKeywords = data.seoKeywords.map(
      (size: { value: string }) => size.value
    );

    const availableSizes = data.availableSizes.map(
      (size: { value: string }) => size.value
    );
    // console.log({ availableSizes });

    const keyFeatures = data.keyFeatures.map(
      (feature: { value: string }) => feature.value
    );

    const specification: { [key: string]: string } = {};
    data.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );

    // console.log({ availableSizes, keyFeatures, specification });

    const modifiedData = {
      ...data,
      seoKeywords,
      availableSizes,
      keyFeatures,
      specification,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      weight: parseFloat(data.stock),
    };
    // console.log({ modifiedData });
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    // console.log({formData});

    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {
      const res = await addProduct(formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/protected/admin/shop/products");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <Logo />

        <h1 className="text-xl font-bold">Add Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* SEO Title */}
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* seo Description */}
            <div className="my-5">
              <FormField
                control={form.control}
                name="seoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* SEO Keywords  */}
            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5 ">
                <p className="text-primary font-bold text-xl">SEO Keywords</p>
                <Button
                  onClick={addSeoKeyword}
                  variant="outline"
                  className="size-10"
                  type="button"
                >
                  <Plus className="text-primary" />
                </Button>
              </div>

              <div className="my-5">
                {seoKeywordFields.map((seoField, index) => (
                  <div key={seoField.id}>
                    <FormField
                      control={form.control}
                      name={`seoKeywords.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keyword {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Price  */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedCategory(val);
                      form.setValue("subcategory", ""); // reset subcategory
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subcategory */}
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .find((cat) => cat._id === selectedCategory)
                        ?.children?.map((child) => (
                          <SelectItem key={child._id} value={child._id}>
                            {child.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Images  */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>
          {/* Available Sizes */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Available Sizes</p>
              <Button
                variant="outline"
                className="size-10"
                onClick={addSize}
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {sizeFields.map((sizeField, index) => (
                <div key={sizeField.id}>
                  <FormField
                    control={form.control}
                    name={`availableSizes.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Key Features  */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Key Features</p>
              <Button
                onClick={addFeatures}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {featureFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`keyFeatures.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Feature {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Specification */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Specification</p>
              <Button
                onClick={addSpec}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {specFields.map((specField, index) => (
              <div
                key={specField.id}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
              >
                <FormField
                  control={form.control}
                  name={`specification.${index}.key`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature name {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specification.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Description {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
