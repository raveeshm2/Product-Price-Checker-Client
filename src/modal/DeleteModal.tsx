import React, { useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import he from "he";
import { ProductModel } from '../products/productList/models/product';
import { State } from "../root/store/reducer";
import { ItemRequestState } from '../global/model/state';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PRODUCT_RESOURCE } from '../products/productList/store/saga';

interface DeleteModalProps {
    show: boolean,
    onHide: () => void,
    product?: ProductModel
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ product, show, onHide }) => {

    const dispatch = useDispatch();
    const response = useSelector<State, ItemRequestState<Response>>(state => state.products.deletePRoduct);

    async function onSubmit() {
        dispatch(DELETE_PRODUCT_RESOURCE.request({
            id: product!.id
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {product?.alias}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>{product && product.productName && he.decode(product.productName)}</h6>
                <h5>Are you sure, you want to remove this product ?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" type="submit" disabled={response.loading} onClick={onSubmit}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={response.loading ? 'd-inline-block' : 'd-none'}
                    />
                    <span className={response.loading ? 'ml-3 d-inline-block' : 'd-none'}>Loading...</span>
                    <span className={!response.loading ? 'd-inline-block' : 'd-none'}>Yes, I confirm</span>
                </Button>
                <Button variant="primary" onClick={onHide}>No</Button>
            </Modal.Footer>

        </Modal>

    );
}