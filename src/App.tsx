import React, { useReducer } from 'react';
import './App.scss';
import { ProductList } from './products/productList';
import { GlobalContext as Context, reducer, initialState } from './config/globalState';
import { Toast } from "./ui/toast";
import { Navigation } from './Navbar/Navigation';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      <Navigation />
      <Toast />
      <Switch>
        <Route path='/' component={ProductList} />
      </Switch>
    </Context.Provider>
  );
}

export default App;
