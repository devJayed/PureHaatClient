type Specification = {
  processor: string;
  ram: string;
  storage: string;
  display: string;
};

export interface IProduct {
  _id: string;
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  price: number;
  stock: number;
  weight: number;
  category: {
    _id: string;
    name: string;
  };
  subcategory: {
    _id: string;
    name: string;
  };
  images: { url: string; altText?: string }[];
  isActive: boolean;
  averageRating: number;
  ratingCount: number;
  availableSizes: string[];
  specification: Specification;
  keyFeatures: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  offerPrice: number;
  orderQuantity?: number;
}
