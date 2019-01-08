export interface IMessage {
    businessId: string;
    message: string,
    type: 'product' | 'site';
    sources: 'amazon' | 'facebook' | 'kudobuzz',
    rating: number
}