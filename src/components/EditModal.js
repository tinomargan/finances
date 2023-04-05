import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { db } from "../config/firebase";
import { addDoc, collection, Timestamp } from 'firebase/firestore'

const EditModal = (props) => {
    const itemsCollectionReference = collection(db, "items")

    /* const formRef = React.useRef(null); */
    
    const todayDate = new Date().toLocaleDateString('en-ca');
    


    /* INICIJALNE VRIJEDNOSTI */

    const [editItem, setEditItem] = React.useState({
        desc: "",
        incomeExpense: null,
        amount: 0,
        paymentType: null,
        eventDate: null,
        paidDate: null,
        dateCreated: todayDate
    });
    


    /* EVIDENTIRANJE PROMJENA */

    const handleChange = (e) => {
        console.log(e.target.value);
        setEditItem((editItem) => ({
            ...editItem,
           [e.target.name]: e.target.type === "radio" ? e.target.id : e.target.value
        }));
    }

    
    
    /* GUMB "DANAS" */

    const handleTodayButton = (e) => {
        if (e.target.id === "danas-event-date") {
            document.getElementById("eventDate").value = todayDate;
            e.target.value = todayDate;
            e.target.name = "eventDate";
            handleChange(e);
        } else if (e.target.id === "danas-paid-date") {
            document.getElementById("paidDate").value = todayDate;
            e.target.value = todayDate;
            e.target.name = "paidDate";
            handleChange(e);
        }
    }



    /* SPREMANJE STAVKE U BAZU */

    const handleSave = async () => {
        console.log(editItem.dateCreated);
        try {
            if (editItem.eventDate != null) {
                const eD = new Timestamp;
                eD.seconds = Date.parse(editItem.eventDate)/1000;
                eD.nanoseconds = 0;
                editItem.eventDate = eD;
            }
            
            if (editItem.paidDate != null) {
                const pD = new Timestamp;
                pD.seconds = Date.parse(editItem.paidDate)/1000;
                pD.nanoseconds = 0;
                editItem.paidDate = pD;
            }

            const dC = new Timestamp;
            dC.seconds = Date.parse(editItem.dateCreated)/1000;
            dC.nanoseconds = 0;
            editItem.dateCreated = dC;
            
            await addDoc(itemsCollectionReference, {
                desc: editItem.desc,
                incomeExpense: editItem.incomeExpense,
                amount: parseFloat(editItem.amount),
                paymentType: editItem.paymentType,
                eventDate: editItem.eventDate,
                paidDate: editItem.paidDate,
                dateCreated: editItem.dateCreated
            })

            /* getItemsList(); */
        } catch (error) {
            console.error(error);
        }
        props.close();
    }



    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.close}
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
                            defaultValue={editItem.desc}
                            name="desc"
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
                            type='number'
                            name="amount"
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
                    <Form.Label>Datum događaja</Form.Label>
                    <Form.Group className="mb-3 d-flex align-items-end" controlId="eventDate">
                        <Form.Control
                            name="eventDate"
                            type='date'
                            /* onFocus={(e) => e.currentTarget.focus()} */
                            /* defaultValue={editItem.eventDate} */
                            onChange={handleChange}
                        />
                        <Button variant="primary" id="danas-event-date" onClick={handleTodayButton}>
                            Danas
                        </Button>
                    </Form.Group>
                    <Form.Label>Datum plaćanja</Form.Label>
                    <Form.Group className="mb-3 d-flex align-items-end" controlId="paidDate">
                        <Form.Control
                            name="paidDate"
                            type='date'
                            /* onFocus={(e) => console.log(e)} */
                            onChange={handleChange}
                        />
                        <Button variant="primary" id="danas-paid-date" onClick={handleTodayButton}>
                            Danas
                        </Button>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={
                            editItem.desc != ""
                            ? props.ask
                            : editItem.amount != 0
                                ? props.ask
                                : editItem.incomeExpense != null
                                    ? props.ask
                                    : editItem.paymentType != null
                                        ? props.ask
                                        : editItem.eventDate != null
                                            ? props.ask
                                            : editItem.paidDate != null
                                                ? props.ask
                                                : props.close
                        }
                    >
                        Odustani
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                    >
                        Unesi novu stavku
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditModal;