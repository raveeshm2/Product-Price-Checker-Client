import { call, put } from "redux-saga/effects";
import { Response } from "../../global/model/response";
import { ItemRequestState } from "../../global/model/state";
import { Requests } from "../../global/requests";
import { Resource } from "../../global/store/request";
import { SagaBase } from "../../global/store/saga-base";
import { createToast } from "../../ui/toast/action";
import { CronJobRequestModal, CronStatusResponse } from "../models/cron";
import { history } from "../../index";
import { push } from "connected-react-router";

export const CRON_STATUS_RESOURCE = new Resource<null, CronStatusResponse, ItemRequestState<CronStatusResponse>>('/CRON/STATUS');
export const CRON_START_RESOURCE = new Resource<CronJobRequestModal, Response, ItemRequestState<Response>>('/CRON/START');
export const CRON_STOP_RESOURCE = new Resource<null, Response, ItemRequestState<Response>>('/CRON/STOP');

export class CronJobsSaga extends SagaBase {

    assignment: {
        [actionType: string]: (action: any) => IterableIterator<any>
    } = {
            [CRON_STATUS_RESOURCE.requestActionType]: this.status,
            [CRON_START_RESOURCE.requestActionType]: this.startJob,
            [CRON_STOP_RESOURCE.requestActionType]: this.stopJob
        };

    /**
     * Sends cron status request
     * @param action 
     */
    *status(action: ReturnType<typeof CRON_STATUS_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.get, {
                url: '/cron/status'
            }))! as CronStatusResponse;
            yield put(CRON_STATUS_RESOURCE.response(response));
            const url = history.location.pathname;
            // Redirect to Product List page when already logged in and not present on list page
            if (url !== '/productList')
                yield put(push('/productList'));
        } catch (err) {
            yield put(CRON_STATUS_RESOURCE.error(err));
        }
    }

    /**
     * Sends cron job start request
     * @param action 
     */
    *startJob(action: ReturnType<typeof CRON_START_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.post, {
                url: '/cron/start',
                payload: action.payload
            }))! as Response;
            yield put(CRON_START_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(CRON_START_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }

    /**
     * Sends cron job stop request
     * @param action 
     */
    *stopJob(action: ReturnType<typeof CRON_START_RESOURCE.request>): IterableIterator<any> {
        try {
            const response = (yield call(Requests.post, {
                url: '/cron/stop'
            }))! as Response;
            yield put(CRON_STOP_RESOURCE.response(response));
            yield put(createToast("Success", response.message.join('')));
        } catch (err) {
            yield put(CRON_STOP_RESOURCE.error(err));
            yield put(createToast("Error", err.errors.join('. ')));
        }
    }
}