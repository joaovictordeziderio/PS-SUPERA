import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import '../../global.css';
import './styles.css';

export default function Login(){
    const [usr, setUsr ] = useState('');
    const [psw, setPsw ] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('login', {usr, psw});
            localStorage.setItem('users_name', response.data[0].name);
            localStorage.setItem('users_id', response.data[0].id);
            history.push('/home');
        }catch(err){
            alert('Usuário ou senha incorretos.');
        }
    }

    return(
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>Sistema de ferramentas<br /> Condomínio</h2>
                    <p>Login or register from here to access.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" placeholder="User Name" required
                                value = {usr}
                                onChange = {e => setUsr(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" required
                                value = {psw}
                                onChange = {e => setPsw(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="button">Login</button>

                        <Link to="/cadastro">
                            <FiLogIn size={16} color="#000" /> 
                            Não tenho cadastro
                        </Link>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}