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

export const CRONValidationSchema = yup.object({
    email: yup.string().required('Email is required').email('Not a valid email address')
});

export const SettingsValidationSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().min(8, 'Must be atleast 8 characters'),
    confirmPassword: yup.string().when('newPassword', {
        is: (val => val && val.trim() !== ''), then: yup.string().required('Password is required').equals([yup.ref('newPassword')], 'Passwords must match'),
        otherwise: yup.string().max(0, "Please enter new password first")
    })
});

export const LoginValidationSchema = yup.object({
    password: yup.string().required('Password is required')
});