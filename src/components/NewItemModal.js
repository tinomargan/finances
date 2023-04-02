import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const NewItemModal = (props) => {
    const todayDate = new Date().toLocaleDateString('en-ca');
    
    const [newItem, setNewItem] = React.useState({
        desc: "",
        incomeExpense: null,
        amount: "",
        paymentType: null,
        eventDate: todayDate,
        paidDate: null
    });
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setNewItem((newItem) => ({
            ...newItem,
           [e.target.name]: e.target.type === "radio" ? e.target.id : e.target.value
        }));
    }
    
    function handleSave(){
        console.log(newItem);
        props.close();
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.close}
                fullscreen
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nova stavka</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="desc">
                        <Form.Label>Opis stavke</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            autoFocus
                            defaultValue={newItem.desc}
                            onChange={handleChange}
                        /> 
                    </Form.Group>
                    <Form.Group
                        controlId="incomeExpense"
                        onChange={handleChange}
                    >
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
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Label>Iznos</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label='Iznos'
                            onChange={handleChange}
                        />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <Form.Group
                        controlId="paymentType"
                        onChange={handleChange}
                    >
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
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="eventDate">
                        <Form.Label>Datum događaja</Form.Label>
                        <Form.Control
                            type='date'
                            defaultValue={newItem.eventDate}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="paidDate">
                        <Form.Label>Datum plaćanja</Form.Label>
                        <Form.Control
                            type='date'
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={props.close}
                    >
                        Odustani
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                    >
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NewItemModal;