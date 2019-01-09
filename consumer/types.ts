export interface IReview {
    businessId: string;
    message: string;
    type: 'product' | 'site';
    sources: 'amazon' | 'facebook' | 'kudobuzz';
    rating: number;
}