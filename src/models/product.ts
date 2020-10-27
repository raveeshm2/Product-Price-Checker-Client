export interface ProductModel {
    id: string
    alias: string,
    productName: string,
    url: string,
    price: number,
    cutOffPrice: number,
    imgURL?: string,
    portal: string
}