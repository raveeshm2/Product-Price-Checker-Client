import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { ProductModel } from '../models/product';
import he from "he";

interface productProps extends ProductModel {
    setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const IMG_NOTAVAILABLE = 'https://images.squarespace-cdn.com/content/v1/578988fe46c3c4caeebf9a64/1519166675314-L19694E63MJHS3P3BNUV/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwkCFOLgzJj4yIx-vIIEbyWWRd0QUGL6lY_wBICnBy59Ye9GKQq6_hlXZJyaybXpCc/sorry-image-not-available.png'

export const Product: React.FC<productProps> = (product) => {
    const imgURL = product.imgURL || IMG_NOTAVAILABLE;
    return (
        <Card style={{ minWidth: '18rem' }} className='h-100'>
            <Card.Img variant="top" src={imgURL} />
            <Card.Body className='d-flex flex-column justify-content-end'>
                <Card.Title>{product.alias}</Card.Title>
                {product && product.productName && <Card.Subtitle className='mt-2 mb-2'>{he.decode(product.productName)}</Card.Subtitle>}
                <Card.Text className='mt-4'>
                    Website: {product.portal} <br />
                    Current Price: <b>₹{product.price}</b> <br />
                    Cut Off Price: ₹{product.cutOffPrice} <br />
                </Card.Text>

                <div className='d-flex justify-content-between'>
                    <Button variant="primary" onClick={() => window.open(product.url, '_blank')!.focus()}>Buy Now !</Button>
                    <div className='d-inline-flex justify-content-end'>
                        <Button variant="secondary" onClick={() => product.setShowModal(product.id)}>Edit</Button>
                        <Button className='ml-1' variant="danger" onClick={() => window.open(product.url, '_blank')!.focus()}>Delete</Button>
                    </div>
                </div>

            </Card.Body>
        </Card>);
}