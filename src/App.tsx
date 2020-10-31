import React, { useReducer } from 'react';
import './App.scss';
import { ProductList } from './products/productList';
import { GlobalContext as Context, reducer, initialState } from './config/globalState';
import { Toast } from "./ui/toast";
import { Switch, Route } from 'react-router-dom';
import { Login } from './login/login';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ ...state, dispatch }}>
      <Toast />
      <Switch>
        <Route path='/productList' component={ProductList} />
        <Route path='/' component={Login} />
      </Switch>
    </Context.Provider>
  );
}

export default App;
