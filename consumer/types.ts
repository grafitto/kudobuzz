export interface IReview {
    businessId: string;
    message: string,
    type: string;
    sources: 'amazon' | 'facebook' | 'kudobuzz'
}