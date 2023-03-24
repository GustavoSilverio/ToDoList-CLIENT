import React, { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { http } from "../Services/Provider";
import Swal from "sweetalert2";


const Modals = (props) => {

    const tarefa = props.tarefaSelecionada[0];
    const [titulo, setTitulo] = useState(tarefa.title);
    const [desc, setDesc] = useState(tarefa.description);

    const salvarAlterações  = async () => {
        if(titulo){
            await http.put("api/tarefas/atualizar-task/" + tarefa.id, {
                title: titulo,
                description: desc
            }).then((res) => {
                if(res){
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarefa alterada com sucesso!',
                        showConfirmButton: false,
                        timer: 2000,
                        position: "top-end",
                        toast: true,
                        timerProgressBar: true,
                        customClass: {
                            timerProgressBar: "prog-bar-success"
                        }
                    })
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);
                }
                props.onHide();
            })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'o título é obrigatório!',
                showConfirmButton: false,
                timer: 2000,
                position: "top-end",
                toast: true,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: "prog-bar-error"
                }
            })
        }
    }

    return (
        <>
            <Modal
                {...props}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitulo(e.target.value)}
                                type="text"
                                placeholder={tarefa.title}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                               onChange={(e) => setDesc(e.target.value)}
                               placeholder={tarefa.description}
                               as="textarea"
                               rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={() => salvarAlterações()}>
                        Salvar alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Modals;