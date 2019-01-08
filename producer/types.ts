export interface IMessage {
    businessId: string;
    message: string,
    type: string;
    sources: 'amazon' | 'facebook' | 'kudobuzz'
}