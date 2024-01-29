import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import NewCategoryModal from "./NewCategoryModal";
/* import { Spinner } from "react-bootstrap"; */

const NewItemModal = ({ show, ask, close, reload, reloadCategoryList, newCategory }) => {

    const [categoryList, setCategoryList] = React.useState([]);
    const itemCollectionReference = collection(db, "item");

    const todayDate = new Date().toLocaleDateString("en-ca");
    const todayDateForDateCreatedAndDateModified = new Date().toUTCString();

    /* const [loading, setLoading] = React.useState(true); */

    /* DOHVAĆANJE KATEGORIJA IZ BAZE */

    React.useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const firestoreInstance = getFirestore();
                const categoryCollectionReference = collection(firestoreInstance, "category");
                const sortedCategories = query(categoryCollectionReference, orderBy("name", "asc"))
                const data = await getDocs(sortedCategories);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setCategoryList(filteredData);
                /* setLoading(false); */
            } catch (error) {
                console.error(error);
                /* setLoading(false); */
            }
        };

        fetchCategoryList();
    }, []);

    /*  const fetchUpdatedCategoryList = async () => {
         try {
             const firestoreInstance = getFirestore();
             const categoryCollectionReference = collection(firestoreInstance, "category");
             const sortedCategories = query(categoryCollectionReference, orderBy("name", "asc"))
             const data = await getDocs(sortedCategories);
             const updatedData = data.docs.map((doc) => ({
                 ...doc.data(),
                 id: doc.id
             }));
             setCategoryList(updatedData);
         } catch (error) {
             console.error(error);
         }
     }; */

    /* LOADING SPINNER */

    /* if (loading) {
        return (
            <div className="loading-indicator">
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    } */

    /* INICIJALNE VRIJEDNOSTI */

    const [newItem, setNewItem] = React.useState({
        desc: "",
        incomeExpense: null,
        amount: 0,
        paymentType: null,
        eventDate: null,
        paidDate: null,
        dateCreated: todayDateForDateCreatedAndDateModified,
        category: "Razno"
    });

    /* EVIDENTIRANJE PROMJENA */

    const handleChange = e => {
        if (e.target.value === "+ Dodaj novu kategoriju") {
            console.log(e.target.value);
            newCategory();
        }
        setNewItem(newItem => ({
            ...newItem,
            [e.target.name]:
                e.target.type === "radio" ? e.target.id : e.target.value
        }));
    };


    /* JE LI KORISNIK KRENUO UNOSITI VRIJEDNOSTI */

    function startedToInputValues() {
        if (newItem.desc !== "") {
            ask();
        } else if (newItem.amount !== 0) {
            ask();
        } else if (newItem.incomeExpense != null) {
            ask();
        } else if (newItem.paymentType != null) {
            ask();
        } else if (newItem.eventDate != null) {
            ask();
        } else if (newItem.paidDate != null) {
            ask();
        } else if (newItem.category !== "Razno") {
            ask();
        } else {
            close();
        }
    }

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
        try {
            if (newItem.eventDate !== null) {
                const firebaseEventDate = new Timestamp();
                firebaseEventDate.seconds =
                    Date.parse(newItem.eventDate) / 1000;
                firebaseEventDate.nanoseconds = 0;
                newItem.eventDate = firebaseEventDate;
            }

            if (newItem.paidDate !== null) {
                const firebasePaidDate = new Timestamp();
                firebasePaidDate.seconds = Date.parse(newItem.paidDate) / 1000;
                firebasePaidDate.nanoseconds = 0;
                newItem.paidDate = firebasePaidDate;
            }

            newItem.dateCreated = todayDateForDateCreatedAndDateModified;
            let firebaseDateCreated = null;
            firebaseDateCreated = new Timestamp();
            firebaseDateCreated.seconds =
                Date.parse(newItem.dateCreated) / 1000;
            firebaseDateCreated.nanoseconds = 0;
            newItem.dateCreated = firebaseDateCreated;

            await addDoc(itemCollectionReference, {
                ...newItem,
                amount: parseFloat(newItem.amount)
            });
            console.log();
        } catch (error) {
            console.error(error);
        }
        close();
        reload();
    };

    return (
        <div>
            <Modal show={show} onHide={close} fullscreen animation={false}>
                <Modal.Header>
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
                                name="incomeExpense"
                                id="prihod"
                            />
                            <Form.Check
                                className="mb-3"
                                type="radio"
                                inline
                                label="Trošak"
                                name="incomeExpense"
                                id="trosak"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Label>Iznos</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="number"
                                name="amount"
                                aria-label="Iznos"
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
                                name="paymentType"
                                id="gotovina"
                            />
                            <Form.Check
                                className="mb-3"
                                type="radio"
                                inline
                                label="Kartica"
                                name="paymentType"
                                id="kartica"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Label>Datum događaja</Form.Label>
                        <Form.Group
                            className="mb-3 d-flex align-items-end"
                            controlId="eventDate"
                        >
                            <Form.Control
                                name="eventDate"
                                type="date"
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
                        <Form.Group
                            className="mb-3 d-flex align-items-end"
                            controlId="category"
                        >
                            <Form.Select
                                name="category"
                                type="select"
                                defaultValue={"Razno"}
                                onChange={handleChange}
                            >
                                {categoryList.map(category => (
                                    <option
                                        value={category.name}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                                <option>+ Dodaj novu kategoriju</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={startedToInputValues}
                    >
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Unesi novu stavku
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewItemModal;