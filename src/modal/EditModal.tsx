import React from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { ProductModel } from '../models/product';
import he from "he";

interface EditModalProps {
    show: boolean,
    onHide: () => void,
    product?: ProductModel
}

export const EditModal: React.FC<EditModalProps> = ({ product, ...props }) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {product?.alias}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{product && he.decode(product.productName)}</h6>

                    <Form.Group controlId="alias">
                        <Form.Label>Product Alias</Form.Label>
                        <Form.Control type="text" placeholder="Enter product alias name" value={product?.alias} />
                    </Form.Group>

                    <Form.Group controlId="productURL">
                        <Form.Label>Product URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product URL" value={product?.url} />
                    </Form.Group>

                    <Form.Group controlId="cutOffPrice">
                        <Form.Label>Cut Off Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Cut Off Price" value={product?.cutOffPrice} />
                    </Form.Group>

                    <Form.Group controlId="imgURL">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" placeholder="Enter Image URL" value={product?.imgURL} />
                        <Form.Text className="text-muted">Not required for Amazon Products but still can pe provided to override default image</Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}