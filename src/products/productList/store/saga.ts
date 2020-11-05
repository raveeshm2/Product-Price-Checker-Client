import { call, put } from "redux-saga/effects";
import { Response } from "../../../global/model/response";
import { ItemRequestState } from "../../../global/model/state";
import { Requests } from "../../../global/requests";
import { Resource } from "../../../global/store/request";
import { SagaBase } from "../../../global/store/saga-base";
import { ProductFormModel } from "../../../models/product";
import { ProductModel, ProductRequestPayload } from "../models/product";
import { createToast } from "../../../ui/toast/action";
import { WithId } from "../../../global/model/util";
import { push } from "connected-react-router";

export const PRODUCT_LIST_RESOURCE = new Resource<null, ProductModel, ItemRequestState<ProductModel>>('/SCRAPE');
export const ADD_PRODUCT_RESOURCE = new Resource<ProductFormModel, Response, ItemRequestState<Response>>('/ADD_PRODUCT');
export const EDIT_PRODUCT_RESOURCE = new Resource<ProductRequestPayload, Response, ItemRequestState<Response>>('/EDIT_PRODUCT');
export const DELETE_PRODUCT_RESOURCE = new Resource<WithId<string>, Response, ItemRequestState<Response>>('/DELETE_PRODUCT');

export class ProductListSaga extends SagaBase {

    assignment: {
        [actionType: string]: (action: any) => IterableIterator<any>
    } = {
            [PRODUCT_LIST_RESOURCE.requestActionType]: this.scrape.bind,
            [ADD_PRODUCT_RESOURCE.requestActionType]: this.addProduct.bind,
            [EDIT_PRODUCT_RESOURCE.requestActionType]: this.editProduct.bind,
            [DELETE_PRODUCT_RESOURCE.requestActionType]: this.deleteProduct.bind
        };

    /**
     * Sends scraping request
     * @param action 
     */
    *scrape(action: ReturnType<typeof PRODUCT_LIST_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.get, {
                url: '/scrape'
            }))! as ProductModel;
            yield put(PRODUCT_LIST_RESOURCE.response(response));
        } catch (err) {
            yield put(PRODUCT_LIST_RESOURCE.error(err));
            if (err.errors.includes("User is not authenticated")) {
                yield put(push('/')); // Redirect to login page
            }
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }

    /**
    * Sends Add Product request
    * @param action 
    */
    *addProduct(action: ReturnType<typeof ADD_PRODUCT_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.post, {
                url: '/product',
                payload: action.payload
            }))! as Response;
            yield put(ADD_PRODUCT_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(ADD_PRODUCT_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }

    /**
    * Sends Edit Product request
    * @param action 
    */
    *editProduct(action: ReturnType<typeof EDIT_PRODUCT_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.put, {
                url: '/product',
                payload: action.payload
            }))! as Response;
            yield put(EDIT_PRODUCT_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(EDIT_PRODUCT_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }

    /**
    * Sends delete Product request
    * @param action 
    */
    *deleteProduct(action: ReturnType<typeof DELETE_PRODUCT_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.delete, {
                url: '/product',
                payload: action.payload
            }))! as Response;
            yield put(DELETE_PRODUCT_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(DELETE_PRODUCT_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }
}