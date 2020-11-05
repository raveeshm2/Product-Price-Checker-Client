import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConnectedRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createStore } from './root/store/store';
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { MainSaga } from './global/store/main-saga';
import { UserSaga } from './login/store/saga';
import { Provider } from "react-redux";
import { ProductListSaga } from './products/productList/store/saga';
import { CronJobsSaga } from './cron/store/saga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(history, [
  sagaMiddleware,
  routerMiddleware(history)
]);

const saga = new MainSaga([
  new UserSaga(),
  new ProductListSaga(),
  new CronJobsSaga()
]);

sagaMiddleware.run(saga.rootSaga.bind(saga));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
