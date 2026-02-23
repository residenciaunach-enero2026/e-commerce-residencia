export type ProductType = { 
  quantity?: number;
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  subtitle: string; // NUEVO
  description: string;
  includes: any; // NUEVO (Depende de si usas Blocks o Rich Text)
  note: string; // NUEVO
  active: boolean;
  isFeatured: boolean;
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