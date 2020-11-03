import { AnyAction } from "redux"
import { ItemRequestState } from "../../../global/model/state";
import { addReducers, combineSimplyfiedReducers, handleUndefinedState } from "../../../global/store/reducer";
import { getResourceInitialState } from "../../../global/store/request";
import { ProductModel } from "../models/product";
import { ADD_PRODUCT_RESOURCE, DELETE_PRODUCT_RESOURCE, EDIT_PRODUCT_RESOURCE, PRODUCT_LIST_RESOURCE } from "./saga";


export interface State {
    list: ItemRequestState<ProductModel[]>;
    addProduct: ItemRequestState<Response>;
    editProduct: ItemRequestState<Response>;
    deletePRoduct: ItemRequestState<Response>;
}

export const initialState: State = {
    list: getResourceInitialState(null),
    addProduct: getResourceInitialState(null),
    editProduct: getResourceInitialState(null),
    deletePRoduct: getResourceInitialState(null)
};

export const reducer = handleUndefinedState(
    addReducers([
        combineSimplyfiedReducers<State, AnyAction>({
            // @ts-ignore
            list: PRODUCT_LIST_RESOURCE.reducer,
            // @ts-ignore
            addProduct: ADD_PRODUCT_RESOURCE.reducer,
            // @ts-ignore
            editProduct: EDIT_PRODUCT_RESOURCE.reducer,
            // @ts-ignore
            deletePRoduct: DELETE_PRODUCT_RESOURCE.reducer,
        })
    ]),
    initialState
);