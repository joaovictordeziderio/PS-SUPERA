const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgcondominio',
    password: 'postgres',
    port: 5432,
});

const listItem = (request, response) => {
    // const { id = null } = request.body;
    const users_id = request.headers.authorization;

    pool.query('SELECT * FROM item INNER JOIN (SELECT users.id user_id, users.name name_user FROM users) users ON users.user_id = item.users_id' + ((users_id!=null)? ' WHERE users_id = ' + users_id : ' ' ) + ' AND is_active = ' + true, (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).json(results.rows);
    });
}

const listItemDisponiveis = (request, response) => {
    const users_id = request.headers.authorization;
    pool.query('select * from item as i where i.id not in (select distinct(op.item_id) from operation as op where op.end_action_date is null) and i.users_id <> $1', [users_id], (error, results) =>{
        if(error){
            throw error;
        }
        return response.status(200).json(results.rows);
    });
}

const createItem = (request, response) => {
    const { name, price_per_day, is_active = 1 } = request.body;
    const users_id = request.headers.authorization;

    pool.query('INSERT INTO item (users_id, name, price_per_day, is_active) VALUES ($1, $2, $3, $4)', [users_id, name, price_per_day, is_active], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(201).send('Successful item insertion.');
    });
}

const updateItem = (request, response) => {
    const { id, name, price_per_day, is_active = 1 } = request.body;
    const users_id = request.headers.authorization;

    pool.query('UPDATE item SET name = $1, price_per_day = $2, is_active = $3 WHERE id = $4 AND users_id = $5', [name, price_per_day, is_active, id, users_id], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).send('Successful item update');
    });
}

const deleteItem = (request, response) => {
    const id = parseInt(request.params.id);
    const users_id = request.headers.authorization;

    pool.query('UPDATE item SET is_active = $1 WHERE id = $2 AND users_id = $3', [0, id, users_id], (error, results) =>{
        if(error){
            throw error;
        }
        return response.status(200).send('Delete successful');
    });
}

module.exports = {
    listItemDisponiveis,
    deleteItem,
    listItem,
    createItem,
    updateItem
}