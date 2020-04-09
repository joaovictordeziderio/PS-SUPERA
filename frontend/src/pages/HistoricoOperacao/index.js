import React, { useEffect, useState } from 'react';
import {  } from 'react-router-dom';
import SideBar from '../SideBar/index';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import './styles.css';


export default function HistoricoItem(props){
    const users_id = localStorage.getItem('users_id');
    const [idItem, setIdItem] = useState(props.location.state !== undefined ? props.location.state.id : null)
    const [itens, setItens] = useState([]);

    useEffect(() => {
            api.get('/operacao/user-finish', {headers: {Authorization: users_id}})
            .then(response => {setItens(response.data);})
            }, [users_id]);

    function valorTotal(ppd, action_date, end_action_date){
        let days;
        let diff;
        if(end_action_date === action_date)
            days = 1;
        else{
            diff = Math.abs(new Date(end_action_date).getTime() - new Date(action_date).getTime());
            days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
        const valorTotal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(days*ppd);
        return valorTotal;
    }

    if(itens.length !== 0){
        return (
            <SideBar>
                <h2>Histórico itens alugados ou pegos emprestados</h2>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Ferramenta</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Data início</th>
                            <th scope="col">Data final</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map(item => (
                                <tr key={item.op_id}>
                                    <td>{item.name}</td>
                                    <td>{valorTotal(item.ppd, item.action_date, item.end_action_date)}</td>
                                    <td>{new Date(item.action_date).toLocaleDateString('en-GB')}</td>
                                    <td>{new Date(item.end_action_date).toLocaleDateString('en-GB')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SideBar>
        );
    }else{
        return(
            <SideBar>
                <h2>Não existe histórico</h2>
            </SideBar>
        );
    }
}