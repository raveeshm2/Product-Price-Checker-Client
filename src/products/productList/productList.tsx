import React, { useEffect, useState } from 'react';
import { CardDeck, Col, Container } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { DeleteModal } from '../../modal/DeleteModal';
import { EditModal } from '../../modal/EditModal';
import { Navigation } from '../../Navbar/Navigation';
import { Spinner } from "../../ui/Spinner";
import { Product } from "../product";
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../../root/store/reducer";
import { ProductModel } from './models/product';
import { PRODUCT_LIST_RESOURCE } from './store/saga';
import { ItemRequestState } from '../../global/model/state';

interface ProductListProps extends RouteComponentProps { }

export const ProductList: React.FC<ProductListProps> = (props) => {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [delectProduct, setDeleteProduct] = useState<string | null>(null);
    const dispatch = useDispatch();
    const response = useSelector<State, ItemRequestState<ProductModel[]>>(state => state.products.list);

    useEffect(() => {
        dispatch(PRODUCT_LIST_RESOURCE.request(null))
    }, [dispatch]);

    return (
        <>
            <Navigation />
            <div className='mb-4' style={{ marginTop: '5rem' }}>
                {response.data && <Container>
                    <h1 className='mb-2 pl-1'>Product List</h1>
                    <CardDeck>
                        {response.data.map(product =>
                            <Col lg="4" className='mt-4' key={product.id}>
                                <Product {...product} setEditModal={setSelectedProduct} setDeleteModal={setDeleteProduct} />
                            </Col>
                        )}
                    </CardDeck>
                </Container>}
                <Spinner loading={response.loading ? true : false} frontColor='#4A90E2' size={120} />
                {selectedProduct && <EditModal show={selectedProduct ? true : false} onHide={() => { setSelectedProduct(null) }} product={response.data?.find(product => product.id === selectedProduct)} />}
                {delectProduct && <DeleteModal show={delectProduct ? true : false} onHide={() => { setDeleteProduct(null) }} product={response.data?.find(product => product.id === delectProduct)} />}
            </div>
        </>
    );
}