import React from 'react';
import './App.scss';
import { ProductList } from './products/productList/productList';
import { Toast } from "./ui/toast/toast";
import { Switch, Route } from 'react-router-dom';
import { Login } from './login/login';

function App() {
  return (
    <>
      <Toast />
      <Switch>
        <Route path='/productList' component={ProductList} />
        <Route path='/' component={Login} />
      </Switch>
    </>
  );
}

export default App;
