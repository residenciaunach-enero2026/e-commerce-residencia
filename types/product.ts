export type VariantType = {
  id: number;
  name: string;
  price: number;
  includes: any;
};

export type ProductType = {
  quantity?: number;
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  subtitle: string;
  description: string;
  note: string;
  active: boolean;
  isFeatured: boolean;
  images: {
    id: number;
    documentId: string;
    url: string;
  }[];
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
  };
  variants: VariantType[];
};