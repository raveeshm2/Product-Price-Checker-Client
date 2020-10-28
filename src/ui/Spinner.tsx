import React from 'react'
import { CubeSpinner } from "react-spinners-kit";

interface SpinnerProps {
    size?: number;
    loading: boolean;
    frontColor: string
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
    return (
        <div style={{ height: '80vh' }} className={props.loading ? 'd-flex justify-content-center align-items-center flex-column' : 'd-none'}>
            <CubeSpinner {...props} />
            <div className={props.loading ? 'mt-5' : 'd-none'}>
                <h5> Loading your Products. Please wait...</h5>
            </div>
        </div>

    );
}