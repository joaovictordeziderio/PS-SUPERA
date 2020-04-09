const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 3333;

const dbUsers = require('./models/users');
const dbItem = require('./models/item');
const dbOperation = require('./models/operation');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgcondominio',
    password: 'postgres',
    port: 5432,
});

// const routes = require('./routes');
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({ extended: true })
)

app.use(express.json());
// app.use(routes);

app.post('/item/aluguel', dbOperation.createOperation);
app.put('/operacao/devolucao', dbOperation.endOperation);
app.post('/operacao/itens-usuario', dbUsers.listOperationItemUser);
app.get('/operacao/user', dbUsers.listUserOperationOpen);
app.get('/operacao/user-finish', dbUsers.listUserOperationFinish);
app.get('/operacao/item', dbItem.listItemDisponiveis);

app.get('/item/list', dbItem.listItem);
app.post('/item/cadastro', dbItem.createItem);
app.put('/item/update', dbItem.updateItem);
app.delete('/item/delete/:id', dbItem.deleteItem);

app.post('/login', dbUsers.loginUser);
app.post('/cadastro', dbUsers.registerUser);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})