import React from 'react';
import SideBar from '../SideBar/index';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../SideBar/styles.css';
import './styles.css';

import img from '../../assets/Home.png';

export default function Home(){
    return(
        <SideBar>
            <h2>Bem-vindo a este sistema Web</h2>
            <p>Este tem como objetivo gerenciar alugueis/empréstimos de ferramentas de moradores de um determinado condomínio.</p>
            <p>A imagem abaixo mostra o que podemos encontrar em cada item de nosso menu.</p>
            <img src={img} alt="Home" />
        </SideBar>
    );
}