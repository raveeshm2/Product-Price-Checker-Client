import React, { useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { Form } from 'react-bootstrap';
import { ButtonSpinner } from '../ui/ButtonSpinner';
import { LoginValidationSchema } from "../models/product";
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_RESOURCE } from './store/saga';
import { State } from "../root/store/reducer";
import { ItemRequestState } from '../global/model/state';
import { createToast } from '../ui/toast/action';
import './login.scss';
import { Response } from '../global/model/response';


interface loginProps extends RouteComponentProps { }

interface LoginFormModel {
    email: string,
    password: string
}

export const Login: React.FC<loginProps> = ({ history }) => {

    const dispatch = useDispatch();
    const response = useSelector<State, ItemRequestState<Response>>(state => state.user.login);

    useEffect(() => {
        let message: string | undefined = undefined;
        if (response.data) {
            message = response.data.message.join('');
            dispatch(createToast("Success", message));
            history.push('/productList');
        }
        if (response.error) {
            message = response.error.join('. ');
            dispatch(createToast("Error", message));
        }
    }, [response, dispatch, history]);

    async function onSubmit(user: LoginFormModel) {
        dispatch(LOGIN_RESOURCE.request(user));
    }

    return (
        <div id="cover" className="min-vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-xs-2 mx-auto form p-4" style={{ zIndex: 1 }}>
                        <Formik<LoginFormModel>
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            onSubmit={(user) => {
                                console.log('logging in', user);
                                onSubmit(user);
                            }}
                            validationSchema={LoginValidationSchema}
                        >{({ dirty, isValid }) =>
                            <FormikForm>
                                <h4 className='pt-1 pb-3'>Sign In</h4>

                                <Form.Group controlId="email">
                                    <InputField name="email" type="text" placeholder="Enter email address" autocomplete="off" />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <InputField name="password" type="password" placeholder="Enter password" autocomplete="off" />
                                </Form.Group>

                                <ButtonSpinner
                                    type='submit'
                                    loading={response.loading}
                                    disabled={response.loading || !isValid || !dirty}
                                    loadingText='Logging in..'
                                    staticText="Login"
                                />
                            </FormikForm>
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}