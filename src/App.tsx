import React, { useReducer } from 'react';
import { Container, Row } from 'react-bootstrap'
import './App.scss';
import { ProductList } from './products/productList';
import { GlobalContext as Context, reducer, initialState, GlobalState } from './config/globalState';
import { Toast } from "./ui/toast";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      <Toast />
      <div className="App">
        <Container>
          <Row>
            <ProductList />
          </Row>
        </Container>
      </div>
    </Context.Provider>
  );
}

export default App;
