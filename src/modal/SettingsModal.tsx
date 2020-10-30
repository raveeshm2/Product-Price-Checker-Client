import React, { useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import { InputField } from "../forms/InputField";
import { GlobalContext } from '../config/globalState';
import { ButtonSpinner } from "../ui/ButtonSpinner";
import { SettingsValidationSchema } from '../models/product';


interface SettingsModalProps {
    show: boolean,
    onHide: () => void,
}

interface SettingsFormModal {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const SettingsModal: React.FC<SettingsModalProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const context = useContext(GlobalContext);

    async function onSubmit(user: Pick<SettingsFormModal, "currentPassword" | "newPassword">) {
        setLoading(true);
        const data = (await fetch('https://vast-eyrie-21993.herokuapp.com/user/change', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
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
                    <strong className="mr-auto">Account Settings</strong>
                </>,
                body: <>Updated successfully !!</>
            }
        })
        props.onHide();
        console.log('Response', response);
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Formik<SettingsFormModal>
                    initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    }}
                    onSubmit={(settings) => {
                        console.log('submitting settings', settings);
                        onSubmit({ currentPassword: settings.currentPassword, newPassword: settings.newPassword });
                    }}
                    validationSchema={SettingsValidationSchema}
                >{({ dirty, isValid }) =>
                    <FormikForm>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Change Account Settings
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="currentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <InputField name="currentPassword" type="password" placeholder="Please enter current password" autocomplete="off" />
                            </Form.Group>

                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <InputField name="newPassword" type="password" placeholder="Please enter new password" autocomplete="off" />
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <InputField name="confirmPassword" type="password" placeholder="Please enter same password again" autocomplete="off" />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonSpinner
                                type='submit'
                                loading={loading}
                                disabled={loading || !isValid || !dirty}
                                loadingText='Changing..'
                                staticText="Submit"
                            />
                            <Button variant="secondary" onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </FormikForm>}
                </Formik>
            </Modal>
        </>
    );
}