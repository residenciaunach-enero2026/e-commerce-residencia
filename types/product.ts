export type ProductType = { 
  quantity?: number;
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  active: boolean;
  isFeatured: boolean;
  Taste: string;
  Origin: string;
  price: number;
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
};