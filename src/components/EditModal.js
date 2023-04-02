import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EditModal = (props) => {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.close}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Uredi stavku</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="desc">
                        <Form.Label>Opis stavke</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={props.desc}
                        />
                    </Form.Group>
                    <Form.Check
                        type="radio"
                        inline
                        label="Prihod"
                        name='incomeExpense'
                        id='prihod'
                    />
                    <Form.Check className='mb-3'
                        type="radio"
                        inline
                        label="Trošak"
                        name='incomeExpense'
                        id='trosak'
                    /><br></br>
                    <Form.Label>Iznos</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label='Iznos'
                        />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <Form.Check
                        type="radio"
                        inline
                        label="Gotovina"
                        name='paymentType'
                        id='gotovina'
                    />
                    <Form.Check className='mb-3'
                        type="radio"
                        inline
                        label="Kartica"
                        name='paymentType'
                        id='kartica'
                    /><br></br>
                    <Form.Group className="mb-3" controlId="eventDate">
                        <Form.Label>Datum događaja</Form.Label>
                        <Form.Control
                            type='date'
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="paidDate">
                        <Form.Label>Datum plaćanja</Form.Label>
                        <Form.Control
                            type='date'
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.close}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={props.close}>
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditModal;