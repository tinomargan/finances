import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import edit_icon from "../images/edit-icon.png";
import { db } from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore, orderBy, query, Timestamp } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

const CategoriesListModal = ({ show, close }) => {

    const [loading, setLoading] = React.useState(true);

    /* RELOAD CONTENT */

    const reload = () => window.location.reload();

    /* DOHVAĆANJE KATEGORIJA IZ BAZE */

    const [categoryList, setCategoryList] = React.useState([]);

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
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategoryList();
    }, []);

    /* LOADING SPINNER */

    if (loading) {
        return (
            <div className="loading-indicator">
                <Spinner animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <Modal show={show} onHide={close} fullscreen animation={false}>
                <Modal.Header>
                    <Modal.Title>Popis kategorija</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {categoryList.map(category => (
                        <div className="" key={category.id}>
                            <div className="">{category.name}</div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={close}
                    >
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CategoriesListModal;