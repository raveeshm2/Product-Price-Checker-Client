import * as yup from "yup";

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

export interface ProductFormModel {
    alias: string,
    url: string,
    cutOffPrice: number,
    imgURL: string,
    portal: string
}

export const ProductValidationSchema = yup.object({
    alias: yup.string().required('Alias name is required'),
    url: yup.string().required('Product URL is required'),
    cutOffPrice: yup.string().required('Cutoff price is required').matches(/^[0-9]+$/, 'Only Numbers are supported'),
    portal: yup.string().required('Portal name is required')
});