import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../SideBar/index';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import '../SideBar/styles.css';
import './styles.css';

export default function CadastroItem(props){
    const [idItem, setIdItem] = useState(props.location.state !== undefined ? props.location.state.id : null)
    const [name, setName ] = useState(props.location.state !== undefined ? props.location.state.name : '');
    const [price_per_day, setPPD ] = useState(props.location.state !== undefined ? props.location.state.price_per_day : '');
    const users_id = localStorage.getItem('users_id');

    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();

        const data = {
            name,
            price_per_day
        };

        try{
            await api.post('item/cadastro', data, {headers: { Authorization: users_id }});
            alert('Cadastro realizado com sucesso.');
            history.push('/home');
        } catch (err){

        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const data = {
            id: idItem,
            name,
            price_per_day
        };

        try{
            await api.put('item/update', data, {headers: { Authorization: users_id }});
            alert('Update realizado com sucesso.');
            history.push('/item/list');
        } catch (err){

        }
    }

    
    return(
        <SideBar>
            <h2>Cadastro item</h2>
            <form onSubmit={idItem == null ? handleCadastro : handleUpdate} className="form-cadastro">
                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" placeholder="Name" className="form-control" required
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Valor/Dia</label>
                    <input 
                        type="number" step="0.01" min="0" placeholder="Valor/Dia" className="form-control" required
                        value = {price_per_day}
                        onChange = {e => setPPD(parseFloat(e.target.value))}
                    />
                </div>

                <button type="submit" className="button">Register</button>
            </form>
        </SideBar>
    );
}