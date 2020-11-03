import React, { useEffect } from 'react'
import { ProductFormModel, ProductValidationSchema } from '../models/product';
import { Formik, Form as FormikForm } from 'formik';
import { Button, Modal, Form } from 'react-bootstrap';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PRODUCT_RESOURCE } from '../products/productList/store/saga';
import { State } from "../root/store/reducer";
import { ItemRequestState } from '../global/model/state';
import { ButtonSpinner } from '../ui/ButtonSpinner';

interface AddProductProps {
    show: boolean,
    onHide: () => void,
}

export const AddProductModal: React.FC<AddProductProps> = ({ show, onHide }) => {

    const dispatch = useDispatch();
    const response = useSelector<State, ItemRequestState<Response>>(state => state.products.addProduct)

    async function onSubmit(updatedProduct: ProductFormModel) {
        dispatch(ADD_PRODUCT_RESOURCE.request({
            ...updatedProduct,
            cutOffPrice: parseInt(updatedProduct.cutOffPrice.toString().trim()),
        }));
    }

    useEffect(() => {
        if (!response.loading && (response.data || response.error)) {
            onHide();
        }
    }, [response, onHide]);

    return (
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
                    alias: '',
                    url: '',
                    cutOffPrice: 0,
                    imgURL: '',
                    portal: 'Flipkart',
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
                            Add New product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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
                        <ButtonSpinner
                            type='submit'
                            loading={response.loading}
                            disabled={response.loading || !isValid || !dirty}
                            loadingText="Loading..."
                            staticText="Add Product"
                        />

                        <Button variant="secondary" onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </FormikForm>}
            </Formik>
        </Modal>
    );
}