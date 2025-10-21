export interface ICategory {
  _id: string;
  name: string;
  description: string;
  parent: string | null;
  isActive: boolean;
  createdBy: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children: ICategory[];
}

// For subcategories with populated parent info
export interface ISubcategory extends Omit<ICategory, "parent"> {
  parent: {
    _id: string;
    name: string;
  };
}