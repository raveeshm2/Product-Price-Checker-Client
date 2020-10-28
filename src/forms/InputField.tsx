import React, { ComponentType } from 'react';
import { Field, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

interface InputFieldProps {
    size?: 'sm' | 'lg';
    readOnly?: boolean;
    disabled?: boolean;
    type?: string,
    className?: string,

    name: string,
    placeholder?: string
}

/**
 * Props adapter
 * @param WrappedComponent
 */
const inputFieldAdapter = (
    /**
     * input control component
     */
    WrappedComponent: ComponentType<any>
) => (
    props: FieldProps<string> & InputFieldProps
) => {
        const { field, form, meta, ...rest } = props;
        return (
            <WrappedComponent {...field}
                onChange={((val: any) => {
                    form.setFieldValue(field.name, val.target.value, true)
                })}
                {...rest}
            />
        );
    };

const InputAdapted = inputFieldAdapter(Form.Control);


export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {

    return (
        <Field
            {...props}
            component={InputAdapted}
        />
    );
}