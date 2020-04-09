import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignLeft } from 'react-icons/fi';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import api from '../../services/api';
import './styles.css';
import '../../global.css';

// import { TextLeft } from 'react-bootstrap-icons';

export default class Barra extends Component{

    constructor(props){
        super(props);
    }

    state = {
        estado: false,
    }
    
    render(){
        return(
            <div className="wrapper">
                <div id="sidebar" className={this.state.estado? "active":""}>
                    <div className="sidebar-header">
                        <h3>SGCondomínio</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>{localStorage.getItem('users_name')}</p>

                        <li>
                            <Link to="/home">
                                Home
                            </Link>
                        </li>

                        <li>
                            <a href="#aeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Alugar/Emprestar</a>
                            <ul className="collapse list-unstyled" id="aeSubmenu">
                                <li>
                                    <Link to="/item/aluguel">
                                        Alugar/Emprestar
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/operacao/item">
                                        Listar alugueis/emprestímos ativos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/operacao/historico-usuario">
                                        Histórico
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#ferramentaSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Ferramentas</a>
                            <ul className="collapse list-unstyled" id="ferramentaSubmenu">
                                <li>
                                    <Link to="/item/cadastro">
                                        Cadastrar
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/item/list">
                                        Listar cadastradas
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/operacao/itens-usuario">
                                        Histórico
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/logout">
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
                <main className="content">
                    <div className="sidebar-toggle">
                        <button type="button" id="sidebarCollapse" className="btn text-sidebar bg-turbo-yellow" onClick={ () => this.setState({estado: !this.state.estado})}>
                            <FiAlignLeft />
                        </button>
                    </div>
                    <div className="page-content">
                        {this.props.children}
                    </div>
                </main>
        </div>
        );
    }
}