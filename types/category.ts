export type CategoryType = {
  id: number;
  documentId: string;
  categoryName: string;
  slug: string;
  mainImage: {
    id: number;
    documentId: string;
    url: string;
  };
};