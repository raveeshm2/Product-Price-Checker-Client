import React, { useEffect } from 'react'
import { Formik, Form as FormikForm } from 'formik';
import { Button, Modal, Form, Col, Row, Container } from 'react-bootstrap';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { CRONValidationSchema } from '../models/product';
import { ButtonSpinner } from "../ui/ButtonSpinner";
import { CronJobRequestModal, CronStatusResponse } from './models/cron';
import { useDispatch, useSelector } from 'react-redux';
import { State } from "../root/store/reducer";
import { ItemRequestState } from '../global/model/state';
import { CRON_START_RESOURCE, CRON_STATUS_RESOURCE, CRON_STOP_RESOURCE } from './store/saga';
import { Response } from '../global/model/response';

interface CronJobModalProps {
    show: boolean,
    onHide: () => void,
}

export const CronJobModal: React.FC<CronJobModalProps> = ({ show, onHide }) => {

    const dispatch = useDispatch();
    const cronStatusResponse = useSelector<State, ItemRequestState<CronStatusResponse>>(state => state.cron.status);
    const cronStartResponse = useSelector<State, ItemRequestState<Response>>(state => state.cron.startJob);
    const cronStopResponse = useSelector<State, ItemRequestState<Response>>(state => state.cron.stopJob);

    // Fetches any running cron job status
    useEffect(() => {
        dispatch(CRON_STATUS_RESOURCE.request(null));
    }, [dispatch]);

    // Starts or Restarts a new Cron Job
    async function onStart(cron: CronJobRequestModal) {
        dispatch(CRON_START_RESOURCE.request(cron));
    }

    // Stops any running cron job
    async function onStop() {
        dispatch(CRON_STOP_RESOURCE.request(null));
    }

    useEffect(() => {
        if ((!cronStartResponse.loading && (cronStartResponse.data || cronStartResponse.error))
            || (!cronStopResponse.loading && (cronStopResponse.data || cronStopResponse.error))) {
            onHide();
        }
    }, [cronStartResponse, cronStopResponse, onHide]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Formik<CronJobRequestModal>
                initialValues={{
                    email: cronStatusResponse.data?.email || '',
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
                            <InputField name="email" type="email" placeholder="Enter Your email" autoComplete="off" />
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
                        Cron Job Status: {cronStatusResponse.data?.status === "Running" ? <span className='text-success'>Running once every {cronStatusResponse.data?.cronFrequency}</span> : <span className='text-danger'>Not Running</span>}

                    </Modal.Body>
                    <Modal.Footer>
                        <Container fluid>
                            <Row>
                                <Col xs={12} lg={5} className='pl-0 d-flex justify-content-center justify-content-lg-start'>
                                    <ButtonSpinner variant="danger" onClick={onStop} loading={cronStopResponse.loading} disabled={cronStopResponse.loading || !isValid} staticText="Stop CRON Job" loadingText="Stopping.." />
                                </Col>
                                <Col xs={12} lg={3}><div className='d-sm-block d-lg-none' style={{ height: '.5rem' }}></div></Col>
                                <Col xs={12} lg={4} className='pr-0 d-flex justify-content-center justify-content-lg-end'>
                                    <ButtonSpinner type="submit" loading={cronStartResponse.loading} disabled={cronStartResponse.loading || !isValid} staticText="Start CRON Job" loadingText="Starting.." />
                                    <Button variant="secondary" className='ml-2' onClick={onHide}>Close</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>
                </FormikForm>}
            </Formik>
        </Modal>
    );
}