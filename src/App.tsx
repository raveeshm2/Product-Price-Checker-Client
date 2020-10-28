import React, { useReducer } from 'react';
import './App.scss';
import { ProductList } from './products/productList';
import { GlobalContext as Context, reducer, initialState } from './config/globalState';
import { Toast } from "./ui/toast";
import { Navigation } from './Navbar/Navigation';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      <Toast />
      <div className="App">
        <Navigation />
        <ProductList />
      </div>
    </Context.Provider>
  );
}

export default App;
