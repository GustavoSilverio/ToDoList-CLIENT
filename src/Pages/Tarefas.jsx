import React, { useEffect, useState } from 'react';
import './tarefas.css';
import { http } from '../Services/Provider';
import Swal from 'sweetalert2';
import Modals from '../Components/Modal';

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [show, setShow] = useState(false);
    const [tarefaSelecionada, setTareafaSelecionada] = useState([]);

    const getTarefas = async () => {
        await http.get('api/tarefas/obter-todas').then((res) => {
            setTarefas(res.data);
        })
    }


    useEffect(() => {
        getTarefas();
    }, [])


    const handleClose = () => setShow(false);
    const setModalShow = (id) => {
        setTareafaSelecionada(tarefas.filter(t => t.id == id))
        setShow(true);
    }

    async function novaTarefa() {

        if (!titulo) {
            Swal.fire({
                icon: 'error',
                title: 'o título é obrigatório!',
                showConfirmButton: false,
                timer: 2000,
                position: "top-end",
                toast: true,
                timerProgressBar: false,
                customClass: {
                    timerProgressBar: "prog-bar-error"
                }
            })
        } else {
            await http.post('api/tarefas/criar-task', {
                title: titulo,
                description: desc
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tarefa adicionada com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                    position: "top-end",
                    toast: true,
                    timerProgressBar: false,
                    customClass: {
                        timerProgressBar: "prog-bar-success"
                    }
                })
                setTitulo("");
                setDesc("");
                getTarefas();
            })
        }
    }

    async function excluirTarefa(id) {
        await http.delete('api/tarefas/excluir-task/' + id).then((res) => {
            if (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tarefa excluida com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                    position: "top-end",
                    toast: true,
                    timerProgressBar: false,
                    customClass: {
                        timerProgressBar: "prog-bar-success"
                    }
                })
                getTarefas();
            }
        })
    }
    if (tarefas) {
        var listaTarefas = tarefas.map(t => {
            return <>
                <li key={t.id} className='tarefa'>
                    <div className="txt">
                        <h1 className={t.isDone ? 'bgc t-title completo' : 'bgc t-title'}>{t.title}</h1>
                    </div>
                    <div className="butts">
                        <button onClick={() => setModalShow(t.id)} className='visu-but-task'>Visualizar</button>
                        <button onClick={() => excluirTarefa(t.id)} className='excl-but-task'>Excluir</button>
                    </div>
                </li>
            </>
        })
    }

    return (
        <>
            <div className="tarefas">
                <h1 className='titulo'>Minhas tarefas</h1>
                <div className="add-tarefa">
                    <div className="titulo-camp">
                        <label htmlFor="Titulo">Título <span>*</span></label>
                        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className='titulo-inp' type="text" />
                    </div>
                    <div className="descricao-camp">
                        <label htmlFor="Descrição">Descrição</label>
                        <input value={desc} onChange={(e) => setDesc(e.target.value)} className='descricao-inp' type="text" />
                        <button onClick={() => novaTarefa()} className='confirmar-but'>Adicionar</button>
                    </div>
                </div>
                <div className="lista-de-tarefas">
                    <ul className='lista-das-tarefas'>
                        {tarefas && listaTarefas}
                    </ul>
                </div>
            </div>

            {show &&
                <Modals
                    show={show}
                    onHide={() => handleClose()}
                    atualizarLista={() => getTarefas()}
                    tarefaSelecionada={tarefaSelecionada}
                />
            }
        </>
    );
}

export default Tarefas;