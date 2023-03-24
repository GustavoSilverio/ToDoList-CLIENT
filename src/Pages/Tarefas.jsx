import React, { useEffect, useState } from 'react';
import './tarefas.css';
import { http } from '../Services/Provider';
import Swal from 'sweetalert2';
import Modals from '../Components/Modal';
import { Icon } from '@mdi/react';
import { mdiGithub } from '@mdi/js';

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");
    const [show, setShow] = useState(false);
    const [tarefaSelecionada, setTareafaSelecionada] = useState([]);
    const [obrigatorio, setObrigatorio] = useState(false);
    const handleClose = () => setShow(false);
    const setModalShow = (id) => {
        setTareafaSelecionada(tarefas.filter(t => t.id == id))
        setShow(true);
    }

    const getTarefas = async () => {
        await http.get('api/tarefas/obter-todas').then((res) => {
            setTarefas(res.data);
        })
    }
    useEffect(() => {
        getTarefas();
    }, [])

    async function novaTarefa() {

        if (!titulo) {
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

            setObrigatorio(!obrigatorio);
        }else{
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
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: "prog-bar-success"
                }
            })

            setTimeout(() => {
                window.location.reload(false);
            }, 2000);
        })

        setObrigatorio(!obrigatorio);
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
                    timerProgressBar: true,
                    customClass: {
                        timerProgressBar: "prog-bar-success"
                    }
                })
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }
        })
    }
    if (tarefas){
        var listaTarefas = tarefas.map(t => {
            return <>
                <li key={t.id} className='tarefa'>
                    <div className="txt">
                        <h1 className='bgc'>{t.title}</h1>
                        <p className='bgc'>{t.description}</p>
                    </div>
                    <div className="butts">
                        <button onClick={() => setModalShow(t.id)} className='visu-but-task'>Visualizar</button>
                        <button onClick={() => excluirTarefa(t.id)} className='Excl-but-task'>Excluir</button>
                    </div>
                </li>
            </>
        })
    }

    return (
        <>

            {/* //Por enquanto vai ficar comentado, mais tarde arruma para desponibilizar meu git */}
            {/* <div className="icon">
        <Icon path={mdiGithub} size={1} color="#000"/>
    </div> */}

            <div className="tarefas">
                <h1 className='titulo'>Minhas tarefas</h1>
                <div className="add-tarefa">
                    <div className="titulo-camp">
                        <label htmlFor="Titulo">Titulo {obrigatorio && <span>*</span>}</label>
                        <input onChange={(e) => setTitulo(e.target.value)} className='titulo-inp' type="text" />
                    </div>
                    <div className="descricao-camp">
                        <label htmlFor="Descrição">Descrição</label>
                        <input onChange={(e) => setDesc(e.target.value)} className='descricao-inp' type="text" />
                    <button onClick={() => novaTarefa()} className='confirmar-but'>Adicionar</button>
                    </div>
                </div>
                <div className="lista-de-tarefas">
                    <ul className='lista-das-tarefas'>
                        {tarefas && listaTarefas}
                    </ul>
                </div>
            </div>

            { show && 
                <Modals
                    show={show}
                    onHide={() => handleClose()}
                    tarefaSelecionada={tarefaSelecionada}
                />
            }
        </>
    );
}

export default Tarefas;