import React from 'react';
import './tarefas.css'
// import { Icon } from '@mdi/react';
// import { mdiGithub } from '@mdi/js';

const Tarefas = () => {
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
                        <input className='titulo-inp' type="text" />
                    </div>
                    <div className="descricao-camp">
                        <label htmlFor="Descrição">Descrição</label>
                        <input className='descricao-inp' type="text" />
                    </div>
                    <button className='confirmar-but'>Adicionar</button>
                </div>
                <div className="lista-de-tarefas">
                    <ul className='lista-das-tarefas'>
                        <li className='tarefa'>
                            <div className="txt">
                                <h1 className='bgc'>Titulo 1</h1>
                                <p className='bgc'>Descrição blablabla</p>
                            </div>
                            <div className="butts">
                                <button className='visu-but-task'>Visualizar</button>
                                <button className='Excl-but-task'>Excluir</button>
                            </div>
                        </li>
                        <li className='tarefa'>
                            <div className="txt">
                                <h1 className='bgc'>Titulo 1</h1>
                                <p className='bgc'>Descrição blablabla</p>
                            </div>
                            <div className="butts">
                                <button className='visu-but-task'>Visualizar</button>
                                <button className='Excl-but-task'>Excluir</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Tarefas;