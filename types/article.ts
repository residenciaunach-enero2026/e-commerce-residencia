export type ArticleType = {
    id: number;
    documentId: string;
    Title?: string;
    title?: string;
    slug: string;
    excerpt: string;
    content: any; // Could be Blocks or RichText string
    readTime: number;
    author: string;
    coverImage?: {
        id: number;
        documentId: string;
        url: string;
        data?: {
            attributes?: {
                url: string;
            }
        }
    };
    seo?: {
        id: number;
        metaTitle: string;
        metaDescription: string;
    };
    publishedAt?: string;
    updatedAt?: string;
};
