import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../SideBar/index';
import { FiEdit } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import './styles.css';


export default function ItensDisponiveis(){
    const users_id = localStorage.getItem('users_id');
    const [itens, setItens] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('operacao/item', {headers: {Authorization: users_id}})
            .then(response => {
                setItens(response.data);
        })
    }, []);

    async function handleAlugarItem(id, price_per_day){
        const data = {
            item_id: id,
            price_per_day: price_per_day
        }

        try{
            await api.post('/item/aluguel',  data, {headers: {Authorization: users_id}});
            setItens(itens.filter(item => item.id !== id));
        }catch(err){
            alert('Erro na operação do item.');
        }
    }

    return (
        <SideBar>
            <h2>Lista ferramentas disponíveis</h2>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Ferramenta</th>
                            <th scope="col">Valor/Dia</th>
                            <th scope="col">Alugar/Emprestar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(item.price_per_day == null ? 0:item.price_per_day)}</td>
                                <td>
                                    <button onClick={() => handleAlugarItem(item.id, item.price_per_day)} type="button">
                                        <FiEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SideBar>
    );
}