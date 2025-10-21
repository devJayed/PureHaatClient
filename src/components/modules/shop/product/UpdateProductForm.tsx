"use client";

import { Button } from "@/components/ui/button";
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
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Plus } from "lucide-react";
import Logo from "@/assets/svgs/Logo";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory, IProduct } from "@/types";
import { getAllCategories } from "@/services/Category";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProduct } from "@/services/Product";

export default function UpdateProductForm({ product }: { product: IProduct }) {
  // console.log({ product });

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const [imagePreview, setImagePreview] = useState<string[] | []>(
    product?.images.map((img) => img.url) || []
  );

  const [categories, setCategories] = useState<ICategory[] | []>([]);

  // const [brands, setBrands] = useState<IBrand[] | []>([]);

  const router = useRouter();

  // using setting default values
  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      seoTitle: product?.seoTitle || "",
      seoDescription: product?.seoDescription || "",
      seoKeywords: product?.seoKeywords?.map((word) => ({
        value: word,
      })) || [{ value: "" }],

      price: product?.price || "",
      category: product?.category?._id || "",
      // brand: product?.brand?.name || "",
      stock: product?.stock || "",
      weight: product?.weight || "",
      availableSizes: product?.availableSizes?.map((size) => ({
        value: size,
      })) || [{ value: "" }],

      specification: Object.entries(product?.specification || {}).map(
        ([key, value]) => ({ key, value })
      ) || [{ key: "", value: "" }],

      keyFeatures: product?.keyFeatures?.map((feature) => ({
        value: feature,
      })) || [{ value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Update useFieldArray for seoKeywords
  const { append: appendSeoKeyword, fields: seoKeywordFields } = useFieldArray({
    control: form.control,
    name: "seoKeywords",
  });
  const addSeoKeyword = () => {
    appendSeoKeyword({ value: "" });
  };

  // Update useFieldArray for availableSize
  const { append: appendSize, fields: sizeFields } = useFieldArray({
    control: form.control,
    name: "availableSizes",
  });
  const addSize = () => {
    appendSize({ value: "" });
  };

  // Update useFieldArray for keyFeatures
  const { append: appendFeatures, fields: featureFields } = useFieldArray({
    control: form.control,
    name: "keyFeatures",
  });
  const addFeatures = () => {
    appendFeatures({ value: "" });
  };

  // Update useFieldArray for specification
  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "specification",
  });
  const addSpec = () => {
    appendSpec({ key: "", value: "" });
  };

  // Fetching  All Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData?.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    // Calling fetchCategories
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log({ data });
    const seoKeywords = data.seoKeywords.map(
      (keyword: { value: string }) => keyword.value
    );

    const availableSizes = data.availableSizes.map(
      (size: { value: string }) => size.value
    );

    const keyFeatures = data.keyFeatures.map(
      (feature: { value: string }) => feature.value
    );

    const specification: { [key: string]: string } = {};
    data.specification.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );

    // console.log({ availableColors, keyFeatures, specification });

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

    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {
      const res = await updateProduct(formData, product?._id);

      // console.log("Product Id: ",product?._id);

      if (res.success) {
        toast.success(res.message);
        router.push("/user/shop/products");
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

        <h1 className="text-xl font-bold">Update Product Info</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          {/* Name, seoTitle, seoDescription, seoKeywords */}
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
            {/* SEO Description */}
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

            {/* Price */}
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category?._id}
                          value={category?._id}
                          className={
                            category?._id === product?.category?._id
                              ? "bg-green-200 cursor-not-allowed"
                              : ""
                          }
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* brand */}
            {/* <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand?._id} value={brand?._id}>
                          {brand?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
          {/* images  */}
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
          {/* Available Size */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">Available Size</p>
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
          {/* Key Features */}
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
            {isSubmitting ? "Updating Product....." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
