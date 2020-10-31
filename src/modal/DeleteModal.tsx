import React, { useContext, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { ProductModel } from '../models/product';
import he from "he";
import { GlobalContext } from '../config/globalState';

interface DeleteModalProps {
    show: boolean,
    onHide: () => void,
    product?: ProductModel
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ product, ...props }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(GlobalContext);

    async function onSubmit() {
        const request = {
            id: product?.id
        }
        setLoading(true);
        const data = (await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(request)
        }));
        const response = await data.json();
        setLoading(false);
        context.dispatch!({
            type: "UPDATE_TOAST",
            payload: {
                show: true,
                header: <>
                    <strong className="mr-auto"> {product?.alias}</strong>
                </>,
                body: <>Product deleted successfully !!</>
            }
        })
        props.onHide();
        console.log('Response', response);
    }
    return (

        <Modal
            {...props}
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
                <Button variant="danger" type="submit" disabled={loading} onClick={onSubmit}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={loading ? 'd-inline-block' : 'd-none'}
                    />
                    <span className={loading ? 'ml-3 d-inline-block' : 'd-none'}>Loading...</span>
                    <span className={!loading ? 'd-inline-block' : 'd-none'}>Yes, I confirm</span>
                </Button>
                <Button variant="primary" onClick={props.onHide}>No</Button>
            </Modal.Footer>

        </Modal>

    );
}