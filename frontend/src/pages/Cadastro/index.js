import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import '../../global.css';
import './styles.css';

export default function Cadastro(){
    const [name, setName ] = useState('');
    const [usr, setUsr ] = useState('');
    const [psw, setPsw ] = useState('');

    const history = useHistory();

    async function handleCadastro(e) {
        e.preventDefault();

        const data = {
            name,
            usr,
            psw
        };

        try{
            await api.post('cadastro', data);
            alert('Cadastro realizado com sucesso.');
            history.push('/');
        } catch (err){

        }

    }

    return(
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Sistema de ferramentas<br /> Condomínio</h2>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                    <form onSubmit={handleCadastro}>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" className="form-control" placeholder="Name" required
                                value = {name}
                                onChange = {e => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>User Name</label>
                            <input 
                                type="text" className="form-control" placeholder="User Name" required
                                value = {usr}
                                onChange = {e => setUsr(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" className="form-control" placeholder="Password" required
                                value = {psw}
                                onChange = {e => setPsw(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="button">Register</button>

                        <Link to="/">
                            <FiArrowLeft size={16} color="#000" /> 
                            Já tenho cadastro
                        </Link>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}