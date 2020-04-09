import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Barra from './pages/SideBar';
import CadastroItem from './pages/CadastroItem';
import Logout from './pages/Logout';
import ListaItem from './pages/ListaItem';
import ItensDisponiveis from './pages/ItensDisponiveis';
import HistoricoItem from './pages/HistoricoItem';
import OperacaoAtiva from './pages/OperacaoAtiva';
import HistoricoOperacao from './pages/HistoricoOperacao';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" exact component={Cadastro} />
                <Route path="/home" exact component={Home} />
                <Route path="/item/cadastro" exact component={CadastroItem} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/item/list" exact component={ListaItem} />
                <Route path="/item/aluguel" exact component={ItensDisponiveis} />
                <Route path="/operacao/itens-usuario" exact component={HistoricoItem} />
                <Route path="/operacao/item" exact component={OperacaoAtiva} />
                <Route path="/operacao/historico-usuario" exact component={HistoricoOperacao} />


            </Switch>
        </BrowserRouter>
    );
}