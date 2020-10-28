import React, { ReactElement } from 'react';

export interface ToastModal {
    animation?: boolean;
    autohide?: boolean;
    delay?: number;
    minHeight?: string;
    top?: string;
    right?: string;
    header: ReactElement | null;
    body: ReactElement | null;
    show: boolean;
}

export interface InitialState {
    toast: ToastModal
}

export interface UpdateToast {
    type: 'UPDATE_TOAST',
    payload: ToastModal
}

export type Action = UpdateToast;

export interface GlobalState extends InitialState {
    dispatch?: React.Dispatch<Action>
}

export const initialState: InitialState = {
    toast: {
        show: false,
        header: null,
        body: null,
        autohide: true,
        minHeight: '100px',
        top: '5rem',
        right: '5rem',
        delay: 10000
    }
}

export function reducer(state = initialState, action: Action): InitialState {
    switch (action.type) {
        case 'UPDATE_TOAST':
            return {
                ...state,
                toast: { ...state.toast, ...action.payload }
            }
        default:
            return initialState;
    }
}

export const GlobalContext = React.createContext<GlobalState>(initialState);