# Projeto Supera
Sistema Web voltado a solucionar o problema proposto no processo seletivo, sendo este o seguinte:
> Você está responsável por criar um sistema para aluguel/empréstimo de ferramentas num condomínio. Os usuários poderão se cadastrar com usuario e senha. Cada usuário poderá cadastrar quantas ferramentas quiser para liberar o empréstimo/aluguel. Quando o usuário for cadastrar uma ferramenta deve ser inserir um valor/dia. Será tratado como um empréstimo, caso o valor por dia seja zero. 

### MER - Modelo de entidade relacionamento

![](https://github.com/joaovictordeziderio/projeto-supera/blob/master/MER%20PS-Supera.png)

### Sistema
Para a implementação deste sistema, foi escolhido para o desenvolvimento do backend:
* Banco de dados: [postgresql](https://www.postgresql.org)
* Framework: [Node.js](https://nodejs.org/en/)
E para o frontend:
* Framework: [React](https://pt-br.reactjs.org)
* [Bootstrap](https://getbootstrap.com)

### Como utilizar?
1. _Primeiro passo_
Baixar postgresql e em seguida deve-se configura-lo. No terminal insira a seguinte linha:
  ```psql -Upostgres -hlocalhost```
sendo a senha para acesso: "postgres", caso está não for sua senha realize os seguintes passos:
```sudo -u postgres psql``` --> digite sua senha de root --> ```alter user postgres with encrypted password 'postgres';```
Posteriormente, crie a database com o código:
  ```create database sgcondominio```
Em seguida, para criar as tabelas do banco de dados, no [pgadmin](https://www.pgadmin.org) deve-se executar o SQL disponível no diretório: backend/database/tables.sql

2. _Segundo passo_
Em uma nova aba do terminal, execute a seguinte linha no diretório do backend e do frontend: ```npm install```. Após isto, execute também ```npm start``` e será aberto uma guia em seu navegador onde será executado o Sistema Web.

