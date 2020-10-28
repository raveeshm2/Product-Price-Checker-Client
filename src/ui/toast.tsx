import React, { useContext } from 'react'
import { Toast as BootstrapToast } from "react-bootstrap";
import { GlobalContext, initialState } from '../config/globalState';

interface toastProps { }

export const Toast: React.FC<toastProps> = () => {
    const context = useContext(GlobalContext);
    return (
        <BootstrapToast
            style={{
                position: 'fixed',
                top: context.toast.top,
                right: context.toast.right,
                zIndex: 10
            }}
            show={context.toast.show}
            autohide={context.toast.autohide}
            onClose={() => context.dispatch!({
                type: 'UPDATE_TOAST',
                payload: initialState.toast
            })}
            delay={context.toast.delay}
        >
            <BootstrapToast.Header>
                {context.toast.header}
            </BootstrapToast.Header>
            <BootstrapToast.Body>{context.toast.body}</BootstrapToast.Body>
        </BootstrapToast>
    );
}