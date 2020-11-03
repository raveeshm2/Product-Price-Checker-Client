import { Action, combineReducers, Reducer } from "redux";
import { connectRouter, RouterState } from 'connected-react-router';
import * as User from "../../login/store/reducer"
import { History } from "history";
import { ToastState } from "../../ui/toast/model";
import * as Toast from "../../ui/toast/reducer";
import * as ProductList from "../../products/productList/store/reducer";
import * as Cron from "../../cron/store/reducer";

export interface State {
    user: User.State;
    router: RouterState;
    toast: ToastState;
    products: ProductList.State,
    cron: Cron.State
}

export const initialState: State = {
    user: User.initialState,
    router: undefined as unknown as RouterState,
    toast: Toast.initialState,
    products: ProductList.initialState,
    cron: Cron.initialState
};

export function createReducer(history: History): Reducer<State, Action> {
    const combinedReducer = combineReducers({
        user: User.reducer,
        router: connectRouter(history),
        toast: Toast.reducer,
        products: ProductList.reducer,
        cron: Cron.reducer
    });

    return combinedReducer;
}
