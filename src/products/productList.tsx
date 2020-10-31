import React, { useContext, useEffect, useState } from 'react';
import { CardDeck, Col, Container } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { GlobalContext } from '../config/globalState';
import { DeleteModal } from '../modal/DeleteModal';
import { EditModal } from '../modal/EditModal';
import { ProductModel } from '../models/product';
import { Navigation } from '../Navbar/Navigation';
import { Spinner } from "../ui/Spinner";
import { Product } from "./product";

interface ProductListProps extends RouteComponentProps { }

export const ProductList: React.FC<ProductListProps> = ({ history }) => {
    const [productList, setProductList] = useState<ProductModel[]>();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [delectProduct, setDeleteProduct] = useState<string | null>(null);
    const context = useContext(GlobalContext);

    useEffect(() => {
        // Check if Logged in else redirect to login page
        if (!localStorage.getItem('token') && !context.user.isLoggedIn) {
            history.push('/');
        }
    });

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
        <>
            <Navigation />
            <div className='mb-4' style={{ marginTop: '5rem' }}>
                {productList && <Container>
                    <h1 className='mb-2 pl-1'>Product List</h1>
                    <CardDeck>
                        {productList.map(product =>
                            <Col lg="4" className='mt-4'>
                                <Product key={product.id} {...product} setEditModal={setSelectedProduct} setDeleteModal={setDeleteProduct} />
                            </Col>
                        )}
                    </CardDeck>
                </Container>}
                <Spinner loading={!productList ? true : false} frontColor='#4A90E2' size={120} />
                <EditModal show={selectedProduct ? true : false} onHide={() => { setSelectedProduct(null) }} product={productList?.find(product => product.id === selectedProduct)} />
                <DeleteModal show={delectProduct ? true : false} onHide={() => { setDeleteProduct(null) }} product={productList?.find(product => product.id === delectProduct)} />
            </div>
        </>
    );
}