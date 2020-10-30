import React, { useContext, useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { ProductModel, ProductFormModel, ProductValidationSchema } from '../models/product';
import he from "he";
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";
import { GlobalContext } from '../config/globalState';


interface EditModalProps {
    show: boolean,
    onHide: () => void,
    product?: ProductModel
}

export const EditModal: React.FC<EditModalProps> = ({ product, ...props }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(GlobalContext);

    async function onSubmit(updatedProduct: ProductFormModel) {
        const test = {
            ...updatedProduct,
            cutOffPrice: updatedProduct.cutOffPrice.toString().trim(),
            id: product?.id
        }
        setLoading(true);
        const data = (await fetch('https://vast-eyrie-21993.herokuapp.com/product', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(test)
        }));
        const response = await data.json();
        setLoading(false);
        context.dispatch!({
            type: "UPDATE_TOAST",
            payload: {
                show: true,
                header: <>
                    <strong className="mr-auto"> {updatedProduct.alias}</strong>
                </>,
                body: <>Updated successfully !!</>
            }
        })
        props.onHide();
        console.log('Response', response);
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Formik<ProductFormModel>
                    initialValues={{
                        alias: product?.alias || '',
                        url: product?.url || '',
                        cutOffPrice: product?.cutOffPrice || -1,
                        imgURL: product?.imgURL || '',
                        portal: product?.portal || '',
                    }}
                    onSubmit={(product) => {
                        console.log('submitting product', product);
                        onSubmit(product);
                    }}
                    validationSchema={ProductValidationSchema}
                >{({ dirty, isValid }) =>
                    <FormikForm>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {product?.alias}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>{product && product.productName && he.decode(product.productName)}</h6>

                            <Form.Group controlId="alias">
                                <Form.Label>Product Alias</Form.Label>
                                <InputField name="alias" type="text" placeholder="Enter product alias name" autocomplete="off" />
                            </Form.Group>

                            <Form.Group controlId="productURL">
                                <Form.Label>Product URL</Form.Label>
                                <InputField name="url" type="text" placeholder="Enter Product URL" autocomplete="off" />
                            </Form.Group>

                            <Form.Group controlId="cutOffPrice">
                                <Form.Label>Cut Off Price</Form.Label>
                                <InputField name="cutOffPrice" type="text" placeholder="Enter Cut Off Price" autocomplete="off" />
                            </Form.Group>

                            <Form.Group controlId="imgURL">
                                <Form.Label>Image URL</Form.Label>
                                <InputField name="imgURL" type="text" placeholder="Enter Image URL" autocomplete="off" />
                                <Form.Text className="text-muted">Not required for Amazon Products but still can pe provided to override default image</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="portal">
                                <Form.Label>Portal</Form.Label>
                                <SelectField options={[{ key: 'Flipkart', value: 'Flipkart' }, { key: 'Amazon', value: 'Amazon' }]} name="portal" type="select" placeholder="Enter Website Name" />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit" disabled={loading || !isValid || !dirty} style={{ cursor: loading || !isValid || !dirty ? 'not-allowed' : 'pointer' }}>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className={loading ? 'd-inline-block' : 'd-none'}
                                />
                                <span className={loading ? 'ml-3 d-inline-block' : 'd-none'}>Loading...</span>
                                <span className={!loading ? 'd-inline-block' : 'd-none'}>Update</span>
                            </Button>

                            <Button variant="secondary" onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </FormikForm>}
                </Formik>
            </Modal>
        </>
    );
}