const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgcondominio',
    password: 'postgres',
    port: 5432,
});

const listOperation = (request, response) => {
    const { item_id } = request.body;

    pool.query('SELECT * FROM operation WHERE item_id = $1', [item_id], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).json(results.rows);
    });
}

const createOperation = (request, response) => {
    const { item_id, price_per_day } = request.body;
    const action_users_id = request.headers.authorization;

    pool.query('INSERT INTO operation (action_users_id, item_id, price_per_day) VALUES ($1, $2, $3)', [action_users_id, item_id, price_per_day], (error, results) => {
        if(error){
            throw error;
        }
        response.status(201).send('Successful item insertion.');
    });
}

const endOperation = (request, response) => {
    const { item_id, end_action_date } = request.body;

    pool.query('UPDATE operation SET end_action_date = $1 WHERE item_id = $2', [end_action_date, item_id], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).send('Item was returned.');
    });
}
module.exports = {
    listOperation,
    createOperation,
    endOperation
}