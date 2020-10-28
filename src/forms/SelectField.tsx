import React, { ComponentType } from 'react';
import { Field, FieldProps } from 'formik';
import { Form } from 'react-bootstrap';

interface SelectFieldProps {
    size?: 'sm' | 'lg';
    readOnly?: boolean;
    disabled?: boolean;
    type?: string,
    className?: string,
    autocomplete?: 'on' | 'off';
    options: string[]

    name: string,
    placeholder?: string
}

/**
 * Props adapter
 * @param WrappedComponent
 */
const selectFieldAdapter = (
    /**
     * input control component
     */
    WrappedComponent: ComponentType<any>
) => (
    props: FieldProps<string> & SelectFieldProps
) => {
        const { field, form, meta, ...rest } = props;
        return (
            <WrappedComponent as="select" {...field}
                onChange={((val: any) => {
                    form.setFieldValue(field.name, val.target.value, true)
                })}
                {...rest}
            >
                {props.options.map(opt => <option key={opt}>{opt}</option>)}
            </WrappedComponent>
        );
    };

const SelectAdapted = selectFieldAdapter(Form.Control);


export const SelectField: React.FC<SelectFieldProps> = ({ ...props }) => {

    return (
        <Field
            {...props}
            component={SelectAdapted}
        />
    );
}