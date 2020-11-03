import { AnyAction } from "redux"
import { ItemRequestState } from "../../global/model/state";
import { CRON_START_RESOURCE, CRON_STATUS_RESOURCE, CRON_STOP_RESOURCE } from "./saga";
import { CronStatusResponse } from "../models/cron";
import { getResourceInitialState } from "../../global/store/request";
import { addReducers, combineSimplyfiedReducers, handleUndefinedState } from "../../global/store/reducer";
import { Response } from "../../global/model/response";


export interface State {
    status: ItemRequestState<CronStatusResponse>;
    startJob: ItemRequestState<Response>;
    stopJob: ItemRequestState<Response>
}

export const initialState: State = {
    status: getResourceInitialState(null),
    startJob: getResourceInitialState(null),
    stopJob: getResourceInitialState(null),
};

export const reducer = handleUndefinedState(
    addReducers([
        combineSimplyfiedReducers<State, AnyAction>({
            // @ts-ignore
            status: CRON_STATUS_RESOURCE.reducer,
            // @ts-ignore
            startJob: CRON_START_RESOURCE.reducer,
            // @ts-ignore
            stopJob: CRON_STOP_RESOURCE.reducer,
        })
    ]),
    initialState
);