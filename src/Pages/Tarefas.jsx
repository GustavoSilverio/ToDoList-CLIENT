import React, { useEffect, useState } from 'react';
import './tarefas.css';
import { http } from '../Services/Provider';
// import { Icon } from '@mdi/react';
// import { mdiGithub } from '@mdi/js';

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [desc, setDesc] = useState("");

     const sla = async () => {
        http.get('api/tarefas/obter-todas').then((res)=> {
            setTarefas(res.data);
        })
    }
    useEffect(() => {
        sla();
    }, [])

    // ESTA DANDO ERRO, ENTAO ARRUMAR

    async function novaTarefa() {
        http.post('api/tarefas/criar-task', {
            title: titulo,
            desc: desc
        })
    }

    const listaTarefas = tarefas.map(t => {
        return <>
            <li key={t.id} className='tarefa'>
                <div className="txt">
                    <h1 className='bgc'>{t.title}</h1>
                    <p className='bgc'>{t.description}</p>
                </div>
                <div className="butts">
                    <button className='visu-but-task'>Visualizar</button>
                    <button className='Excl-but-task'>Excluir</button>
                </div>
            </li>
        </>
    })

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
                        <label htmlFor="Titulo">Titulo <span>*</span></label>
                        <input onChange={(e) => setTitulo(e.target.value)} className='titulo-inp' type="text" />
                    </div>
                    <div className="descricao-camp">
                        <label htmlFor="Descrição">Descrição</label>
                        <input onChange={(e) => setDesc(e.target.value)} className='descricao-inp' type="text" />
                    </div>
                    <button onClick={() => novaTarefa()} className='confirmar-but'>Adicionar</button>
                </div>
                <div className="lista-de-tarefas">
                    <ul className='lista-das-tarefas'>
                        { tarefas && listaTarefas}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Tarefas;