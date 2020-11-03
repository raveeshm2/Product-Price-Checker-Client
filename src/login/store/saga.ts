import { ItemRequestState } from "../../global/model/state";
import { Requests } from "../../global/requests";
import { Resource } from "../../global/store/request";
import { SagaBase } from "../../global/store/saga-base";
import { LoginModel, SettingsModel } from "../models/UserModel";
import { call, put } from "redux-saga/effects";
import { Response } from "../../global/model/response";
import { createToast } from "../../ui/toast/action";

export const LOGIN_RESOURCE = new Resource<LoginModel, Response, ItemRequestState<Response>>('USER/LOGIN');
export const CHANGE_PASSWORD_RESOURCE = new Resource<SettingsModel, Response, ItemRequestState<Response>>('USER/CHANGE');

export class UserSaga extends SagaBase {

    assignment: {
        [actionType: string]: (action: any) => IterableIterator<any>
    } = {
            [LOGIN_RESOURCE.requestActionType]: this.login.bind(this),
            [CHANGE_PASSWORD_RESOURCE.requestActionType]: this.changePassword.bind(this)
        };

    /**
     * Sends Login Request
     * @param action 
     */
    *login(action: ReturnType<typeof LOGIN_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.post, {
                url: `/user/login`,
                payload: action.payload
            }))! as Response;
            yield put(LOGIN_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(LOGIN_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }

    /**
     * Sends Change Password Request
     * @param action 
     */
    *changePassword(action: ReturnType<typeof CHANGE_PASSWORD_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.put, {
                url: `/user/change`,
                payload: action.payload
            }))! as Response;
            yield put(CHANGE_PASSWORD_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(CHANGE_PASSWORD_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }
}