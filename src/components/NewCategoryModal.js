import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

const NewCategoryModal = ({ show, close, fetchUpdatedCategoryList }) => {

    const [categoryList, setCategoryList] = React.useState([]);
    const [doesCategoryExist, setDoesCategoryExist] = React.useState(false);
    const [newCategory, setNewCategory] = React.useState({
        name: ""
    });
    const categoryCollectionReference = collection(db, "category");

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

    const handleChange = e => {
        for (let i = 0; i < categoryList.length; i++) {
            if (e.target.value.toLowerCase() === categoryList[i].name.toLowerCase()) {
                setDoesCategoryExist(true);
                return;
            }
            if (e.target.value === "") {
                setDoesCategoryExist(true);
                return;
            }
        }
        setNewCategory(newCategory => ({
            ...newCategory,
            name: e.target.value
        }));
        setDoesCategoryExist(false);
    };

    const handleDodaj = async () => {
        try {
            await addDoc(categoryCollectionReference, {
                ...newCategory,
                name: newCategory.name
            });
            console.log(newCategory.name);
            /* fetchUpdatedCategoryList; */

            console.log("Category list reloaded after adding a new category"); // Add this log
        } catch (error) {
            console.error(error);
        }
        close();
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={close}
                centered
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        Dodaj novu kategoriju
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Unesi ime kategorije"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleDodaj} disabled={doesCategoryExist}>
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewCategoryModal;