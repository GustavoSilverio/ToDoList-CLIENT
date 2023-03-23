import React from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Modals = (props) => {

    return (
        <>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.tarefaSelecionada[0].title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.tarefaSelecionada[0].description}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.editando} variant="primary">ALTERAR</Button>
                    <Button onClick={props.onHide} variant="primary">OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Modals;