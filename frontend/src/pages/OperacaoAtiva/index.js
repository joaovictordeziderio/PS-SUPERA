// Listar todas operações ativas do usuário, colocando botão para finalizar a operação
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../SideBar/index';
import { FiSlash } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import './styles.css';


export default function OperacaoAtiva(){
    const users_id = localStorage.getItem('users_id');
    const [itens, setItens] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('/operacao/user', {headers: {Authorization: users_id}})
            .then(response => {
                setItens(response.data);
        })
    }, [users_id]);

    async function handleDevolverItem(item_id){
        const data = {
            item_id: item_id,
            end_action_date: new Date().toJSON()
        }

        try{
            await api.put('/operacao/devolucao',  data);
            setItens(itens.filter(item => item.item_id !== item_id));
        }catch(err){
            alert('Erro na devolução do item.');
        }
    }

    if(itens.length !== 0){
        return (
            <SideBar>
                <h2>Lista ferramentas disponíveis</h2>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Ferramenta</th>
                                <th scope="col">Valor/Dia</th>
                                <th scope="col">Data inicio</th>
                                <th scope="col">Devolver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itens.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(item.ppd == null ? 0:item.ppd)}</td>
                                    <td>{new Date(item.action_date).toLocaleDateString('en-GB')}</td>
                                    <td>
                                        <button onClick={() => handleDevolverItem(item.item_id)} type="button">
                                            <FiSlash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </SideBar>
        );
    }else{
        return (
            <SideBar>
                <h2>Não há operações ativas no momento.</h2>
            </SideBar>
        );
    }
}