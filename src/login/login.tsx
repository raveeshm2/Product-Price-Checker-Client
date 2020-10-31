import React, { useContext, useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { CheckBox } from "../forms/CheckBox";
import { Form } from 'react-bootstrap';
import { ButtonSpinner } from '../ui/ButtonSpinner';
import { LoginValidationSchema } from "../models/product";
import { GlobalContext } from '../config/globalState';
import { RouteComponentProps } from 'react-router-dom';
import './login.scss';

interface loginProps extends RouteComponentProps { }

interface LoginFormModel {
    password: string,
    keepMeLoggedIn: boolean
}
export const Login: React.FC<loginProps> = ({ history }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(GlobalContext);

    async function onSubmit(user: LoginFormModel) {
        setLoading(true);
        console.log('user', user);
        const data = (await fetch('https://vast-eyrie-21993.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }));
        const response = await data.json();
        setLoading(false);
        if (user.keepMeLoggedIn) {
            localStorage.setItem('token', response?.token);
        }
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
                                password: '',
                                keepMeLoggedIn: true
                            }}
                            onSubmit={(user) => {
                                console.log('logging in', user);
                                onSubmit(user);
                            }}
                            validationSchema={LoginValidationSchema}
                        >{({ dirty, isValid }) =>
                            <FormikForm>
                                <h4 className='pt-1 pb-3'>Sign In</h4>

                                <Form.Group controlId="password">
                                    <InputField name="password" type="password" placeholder="Enter password" autocomplete="off" />
                                </Form.Group>

                                <Form.Group controlId="keepMeLoggedIn">
                                    <CheckBox name="keepMeLoggedIn" label="Keep Me Logged In" />
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