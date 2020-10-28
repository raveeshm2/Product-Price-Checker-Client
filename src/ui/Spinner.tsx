import React from 'react'
import RingLoader from "react-spinners/RingLoader";

interface SpinnerProps {
    size?: number;
    loading: boolean;
    color: string
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
    return (
        <RingLoader {...props} />
    );
}