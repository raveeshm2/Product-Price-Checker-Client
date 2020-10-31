import React, { useContext, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { Form } from 'react-bootstrap';
import { ButtonSpinner } from '../ui/ButtonSpinner';
import { LoginValidationSchema } from "../models/product";
import { GlobalContext } from "../config/globalState";
import { RouteComponentProps } from 'react-router-dom';
import './login.scss';

interface loginProps extends RouteComponentProps { }

interface LoginFormModel {
    email: string,
    password: string
}
export const Login: React.FC<loginProps> = ({ history }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(GlobalContext);

    async function onSubmit(user: LoginFormModel) {
        setLoading(true);
        console.log('user', user);
        const data = (await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }));
        const response = await data.json();
        setLoading(false);
        context.dispatch!({
            type: "UPDATE_TOAST",
            payload: {
                show: true,
                header: <>
                    <strong className="mr-auto"> Login </strong>
                </>,
                body: <>Login Successful !!</>
            }
        });
        context.dispatch!({
            type: 'UPDATE_USER',
            payload: {
                isLoggedIn: true,
                token: response?.token
            }
        })
        console.log('Response', response);
        setTimeout(() => {
            history.push('/productList');
        }, 1000);
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
                                    loading={loading}
                                    disabled={loading || !isValid || !dirty}
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