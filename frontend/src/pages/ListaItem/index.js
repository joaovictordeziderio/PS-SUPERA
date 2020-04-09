import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../SideBar/index';
import { FiEdit, FiTrash2, FiAlignJustify } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import './styles.css';


export default function ListaItem(){
    const users_id = localStorage.getItem('users_id');
    const [itens, setItens] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('item/list', {
            headers: {
                Authorization: users_id
            }
        })
        .then(response => {
            setItens(response.data);
        })
    }, [users_id]);

    async function handleDeleteItem(id){
        try{
            // console.log(itens.filter(item => item.id === id)[0].name);
            await api.delete(`item/delete/${id}`, {headers: {Authorization: users_id}});
            setItens(itens.filter(item => item.id !== id));
        }catch(err){
            alert('Erro ao deletar item.');
        }
    }

    function handleHistoryItem(id){
        history.push('/operacao/itens-usuario', {
            id: id
        });
    }

    function handleEditItem(id, name, price_per_day){
        
        history.push('/item/cadastro', {
            id: id,
            name: name,
            price_per_day: price_per_day
        });
    }

    return (
        <SideBar>
            <h2>Lista ferramentas cadastradas</h2>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Ferramenta</th>
                        <th scope="col">Valor/Dia</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Histórico</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(item.price_per_day)}</td>
                                <td>
                                    <button onClick={() => handleEditItem(item.id, item.name, item.price_per_day)} type="button">
                                        <FiEdit />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleHistoryItem(item.id)} type="button">
                                        <FiAlignJustify />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item.id)} type="button">
                                        <FiTrash2 />
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