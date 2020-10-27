import React, { useEffect, useState } from 'react';
import { CardDeck, Col, Container } from 'react-bootstrap';
import { EditModal } from '../modal/EditModal';
import { ProductModel } from '../models/product';
import { Product } from "./product";

interface ProductListProps {

}

export const ProductList: React.FC<ProductListProps> = ({ }) => {
    const [productList, setProductList] = useState<ProductModel[]>();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = (await fetch('https://vast-eyrie-21993.herokuapp.com/scrape'));
            const list: ProductModel[] = await data.json();
            setProductList(list);
            console.log('list', list);
        }
        getData();
    }, [])
    return (
        <div className='mt-4 mb-4'>
            <Container>
                <h1 className='mb-2 pl-1'>Product List</h1>
                <CardDeck>
                    {productList?.map(product =>
                        <Col lg="4" className='mt-4'>
                            <Product key={product.id} {...product} setShowModal={setSelectedProduct} />
                        </Col>
                    )}
                </CardDeck>
            </Container>
            <EditModal show={selectedProduct ? true : false} onHide={() => { setSelectedProduct(null) }} product={productList?.find(product => product.id === selectedProduct)} />
        </div>
    );
}