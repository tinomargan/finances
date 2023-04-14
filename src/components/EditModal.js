import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { db } from "../config/firebase";
import { collection, Timestamp, updateDoc } from "firebase/firestore";
import Content from "./Content";

const EditModal = ({ selectedItem, show, close }) => {
    const itemsCollectionReference = collection(db, "items");

    const todayDate = new Date().toLocaleDateString("en-ca");

    /* INICIJALNE VRIJEDNOSTI */

    const [editItem, setEditItem] = React.useState(selectedItem);

    /* PROBA EDIT */

    /* const editItem = async (id, desc) => {
        const desc = desc;
        await updateDoc()
    }
    
    const setEditItem = () => {
        console.log(desc);
    } */

    /* EVIDENTIRANJE PROMJENA */

    const handleChange = e => {
        console.log(e.target.value);
        setEditItem(prevEditItem => {
            console.log(e.target.value);

            return {
                ...prevEditItem,
                [e.target.name]:
                    e.target.type === "radio" ? e.target.id : e.target.value
            };
        });
    };

    /* GUMB "DANAS" */

    const handleTodayButton = e => {
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
    };

    /* SPREMANJE STAVKE U BAZU */

    const handleSave = async () => {
        console.log(editItem.dateCreated);
        try {
            if (editItem.eventDate != null) {
                const eD = new Timestamp();
                eD.seconds = Date.parse(editItem.eventDate) / 1000;
                eD.nanoseconds = 0;
                editItem.eventDate = eD;
            }

            if (editItem.paidDate != null) {
                const pD = new Timestamp();
                pD.seconds = Date.parse(editItem.paidDate) / 1000;
                pD.nanoseconds = 0;
                editItem.paidDate = pD;
            }

            const dC = new Timestamp();
            dC.seconds = Date.parse(editItem.dateCreated) / 1000;
            dC.nanoseconds = 0;
            editItem.dateCreated = dC;

            await updateDoc(itemsCollectionReference, {
                ...editItem,
                amount: parseFloat(editItem.amount)
            });

            /* getItemsList(); */
        } catch (error) {
            console.error(error);
        }
        close();
    };

    console.log(selectedItem);
    return (
        <div>
            <Modal show={show} onHide={close}>
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
                                name="desc"
                                value={editItem.desc}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Check
                            type="radio"
                            inline
                            label="Prihod"
                            name="incomeExpense"
                            id="prihod"
                            checked={editItem.incomeExpense === "prihod"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            className="mb-3"
                            type="radio"
                            inline
                            label="Trošak"
                            name="incomeExpense"
                            id="trosak"
                            checked={editItem.incomeExpense === "trosak"}
                            onChange={handleChange}
                        />
                        <br></br>
                        <Form.Label>Iznos</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                name="amount"
                                aria-label="Iznos"
                                onChange={handleChange}
                                value={editItem.amount}
                            />
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup>
                        <Form.Check
                            type="radio"
                            inline
                            label="Gotovina"
                            name="paymentType"
                            id="gotovina"
                            checked={editItem.paymentType === "gotovina"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            className="mb-3"
                            type="radio"
                            inline
                            label="Kartica"
                            name="paymentType"
                            id="kartica"
                            checked={editItem.paymentType === "kartica"}
                            onChange={handleChange}
                        />
                        <br></br>
                        <Form.Label>Datum događaja</Form.Label>
                        <Form.Group
                            className="mb-3 d-flex align-items-end"
                            controlId="eventDate"
                        >
                            <Form.Control
                                name="eventDate"
                                type="date"
                                value={editItem.eventDate}
                                onChange={handleChange}
                            />
                            <Button
                                variant="primary"
                                id="danas-event-date"
                                onClick={handleTodayButton}
                            >
                                Danas
                            </Button>
                        </Form.Group>
                        <Form.Label>Datum plaćanja</Form.Label>
                        <Form.Group
                            className="mb-3 d-flex align-items-end"
                            controlId="paidDate"
                        >
                            <Form.Control
                                name="paidDate"
                                type="date"
                                value={editItem.paidDate}
                                onChange={handleChange}
                            />
                            <Button
                                variant="primary"
                                id="danas-paid-date"
                                onClick={handleTodayButton}
                            >
                                Danas
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        /* onClick={
                            editItem.desc != ""
                            ? ask
                            : editItem.amount != 0
                                ? ask
                                : editItem.incomeExpense != null
                                    ? ask
                                    : editItem.paymentType != null
                                        ? ask
                                        : editItem.eventDate != null
                                            ? ask
                                            : editItem.paidDate != null
                                                ? ask
                                                : close
                        } */
                    >
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditModal;
