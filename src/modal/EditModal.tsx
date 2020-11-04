import React, { useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ProductFormModel, ProductValidationSchema } from '../models/product';
import he from "he";
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";
import { ProductModel } from '../products/productList/models/product';
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../root/store/reducer";
import { ItemRequestState } from '../global/model/state';
import { EDIT_PRODUCT_RESOURCE } from '../products/productList/store/saga';
import { ButtonSpinner } from '../ui/ButtonSpinner';

interface EditModalProps {
    show: boolean,
    onHide: () => void,
    product?: ProductModel
}

export const EditModal: React.FC<EditModalProps> = ({ product, show, onHide }) => {

    const dispatch = useDispatch();
    const response = useSelector<State, ItemRequestState<Response>>(state => state.products.editProduct);

    async function onSubmit(updatedProduct: ProductFormModel) {
        dispatch(EDIT_PRODUCT_RESOURCE.request({
            ...updatedProduct,
            cutOffPrice: parseInt(updatedProduct.cutOffPrice.toString().trim()),
            id: product!.id
        }));
    }

    useEffect(() => {
        if (!response.loading && (response.data || response.error)) {
            onHide();
        }
    }, [response, onHide]);

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
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
                    onSubmit={(product) => onSubmit(product)}
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
                                <InputField name="alias" type="text" placeholder="Enter product alias name" autoComplete="off" />
                            </Form.Group>

                            <Form.Group controlId="productURL">
                                <Form.Label>Product URL</Form.Label>
                                <InputField name="url" type="text" placeholder="Enter Product URL" autoComplete="off" />
                            </Form.Group>

                            <Form.Group controlId="cutOffPrice">
                                <Form.Label>Cut Off Price</Form.Label>
                                <InputField name="cutOffPrice" type="text" placeholder="Enter Cut Off Price" autoComplete="off" />
                            </Form.Group>

                            <Form.Group controlId="imgURL">
                                <Form.Label>Image URL</Form.Label>
                                <InputField name="imgURL" type="text" placeholder="Enter Image URL" autoComplete="off" />
                                <Form.Text className="text-muted">Not required for Amazon Products but still can pe provided to override default image</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="portal">
                                <Form.Label>Portal</Form.Label>
                                <SelectField options={[{ key: 'Flipkart', value: 'Flipkart' }, { key: 'Amazon', value: 'Amazon' }]} name="portal" type="select" placeholder="Enter Website Name" />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonSpinner
                                type='submit'
                                loading={response.loading}
                                disabled={response.loading || !isValid || !dirty}
                                loadingText="Loading..."
                                staticText="Update"
                            />
                            <Button variant="secondary" onClick={onHide}>Close</Button>
                        </Modal.Footer>
                    </FormikForm>}
                </Formik>
            </Modal>
        </>
    );
}