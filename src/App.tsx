import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap'
import './App.scss';
import { ProductList } from './products/productList';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <ProductList />
        </Row>
      </Container>
    </div>
  );
}

export default App;
