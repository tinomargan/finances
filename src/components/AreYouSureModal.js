import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AreYouSureModal = props => {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.close}
                centered
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        Jeste li sigurni da želite odustati?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.odustani}>
                        Da
                    </Button>
                    <Button variant="primary" onClick={props.nemojOdustati}>
                        Ne
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AreYouSureModal;
