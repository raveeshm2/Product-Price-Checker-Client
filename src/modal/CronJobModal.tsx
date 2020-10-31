import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form as FormikForm } from 'formik';
import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { GlobalContext } from '../config/globalState';
import { CRONValidationSchema } from '../models/product';
import { ButtonSpinner } from "../ui/ButtonSpinner";

interface CronJobModalProps {
    show: boolean,
    onHide: () => void,
}

export interface CronJobFormModal {
    email: string,
    hour: "15min" | "30min" | "1hr" | "2hr" | "4hr" | "6hr" | "8hr" | "12hr" | "1day" | "1week" | "1month"
}

export interface CronStatusModal {
    status: "Running" | "Not running",
    cronFrequency: string | null,
    email: string
}

export const CronJobModal: React.FC<CronJobModalProps> = (props) => {

    const [loadStart, setLoadStart] = useState<boolean>(false);
    const [loadStop, setLoadStop] = useState<boolean>(false);
    const context = useContext(GlobalContext);
    const [cronStatus, setCronStatus] = useState<CronStatusModal>();


    useEffect(() => {
        const getData = async () => {
            const data = (await fetch(`${process.env.REACT_APP_BASE_URL}/cron/status`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }));
            const status: CronStatusModal = await data.json();
            setCronStatus(status);
            console.log('status', status);
        }
        getData();
    }, [])

    async function onStart(cron: CronJobFormModal) {
        setLoadStart(true);
        const data = (await fetch(`${process.env.REACT_APP_BASE_URL}/cron/start`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(cron)
        }));
        const response = await data.json();
        setLoadStart(false);
        context.dispatch!({
            type: "UPDATE_TOAST",
            payload: {
                show: true,
                header: <>
                    <strong className="mr-auto"> CRON JOB Updated</strong>
                </>,
                body: <>CRON Job started successfully !!</>
            }
        })
        props.onHide();
        console.log('Response', response);
    }

    async function onStop() {
        setLoadStop(true);
        const data = (await fetch(`${process.env.REACT_APP_BASE_URL}/cron/stop`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        }));
        const response = await data.json();
        setLoadStop(false);
        context.dispatch!({
            type: "UPDATE_TOAST",
            payload: {
                show: true,
                header: <>
                    <strong className="mr-auto"> CRON JOB Updated</strong>
                </>,
                body: <>CRON Job stopped successfully !!</>
            }
        })
        props.onHide();
        console.log('Response', response);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Formik<CronJobFormModal>
                initialValues={{
                    email: cronStatus?.email || '',
                    hour: "1day"
                }}
                onSubmit={(cron) => {
                    console.log('updating cron job', cron);
                    onStart(cron);
                }}
                validationSchema={CRONValidationSchema}
                enableReinitialize={true}
            >{({ dirty, isValid }) =>
                <FormikForm>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Manage CRON Jobs
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <InputField name="email" type="email" placeholder="Enter Your email" autocomplete="off" />
                        </Form.Group>

                        <Form.Group controlId="frequency">
                            <Form.Label>Email frequency</Form.Label>
                            <SelectField options={[
                                { key: '15min', value: 'Every 15 minutes' },
                                { key: '30min', value: 'Every 30 minutes' },
                                { key: '1hr', value: 'Every 1 hour' },
                                { key: '2hr', value: 'Every 2 hours' },
                                { key: '4hr', value: 'Every 4 hours' },
                                { key: '6hr', value: 'Every 6 hours' },
                                { key: '8hr', value: 'Every 8 hours' },
                                { key: '12hr', value: 'Every 12 hours' },
                                { key: '1day', value: 'Every day' },
                                { key: '1week', value: 'Every week' },
                                { key: '1month', value: 'Every month' },
                            ]} name="hour" type="select" placeholder="Enter E-mail frequency" />
                        </Form.Group>
                        Cron Job Status: {cronStatus?.status === "Running" ? <span className='text-success'>Running once every {cronStatus.cronFrequency}</span> : <span className='text-danger'>Not Running</span>}

                    </Modal.Body>
                    <Modal.Footer>
                        <Container fluid>
                            <Row>
                                <Col md={12} lg={5} className='pl-0 d-sm-flex'>
                                    <ButtonSpinner variant="danger" onClick={onStop} loading={loadStop} disabled={loadStop || !isValid} staticText="Stop CRON Job" loadingText="Stopping.." />
                                    {/* <Button variant="info" className='ml-2'>Get CRON Status</Button> */}
                                </Col>
                                <Col md={12} lg={3}><div className='d-sm-block d-lg-none' style={{ height: '.5rem' }}></div></Col>
                                <Col md={12} lg={4} className='pr-0 d-flex justify-content-center justify-content-lg-end'>
                                    <ButtonSpinner type="submit" loading={loadStart} disabled={loadStart || !isValid} staticText="Start CRON Job" loadingText="Starting.." />
                                    <Button variant="secondary" className='ml-2' onClick={props.onHide}>Close</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                </FormikForm>}
            </Formik>
        </Modal>
    );
}