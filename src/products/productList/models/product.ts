import { WithId } from "../../../global/model/util";
import { ProductFormModel } from "../../../models/product";

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

export interface ProductRequestPayload extends ProductFormModel, WithId<string> { }