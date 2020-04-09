const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgcondominio',
    password: 'postgres',
    port: 5432,
});

const listOperationItemUser = (request, response) => {
    const { id } = request.body;
    const users_id = request.headers.authorization;
    pool.query('Select * from item left join (select price_per_day as ppd, item_id, action_users_id, action_date, end_action_date from operation) operation on operation.item_id = item.id left join (select users.name as user_name, id from users) users on users.id = operation.action_users_id where operation.end_action_date is not null AND item.users_id = $1' + ((id!=null)? ' AND item.id =  ' + id : ' ' ),[users_id], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).send(results.rows);
    });
}

const listUserOperationOpen = (request, response) => {
    const users_id = request.headers.authorization;
    pool.query('Select * from item left join (select price_per_day as ppd, item_id, action_users_id, end_action_date, action_date from operation) operation on operation.item_id = item.id left join (select users.name as user_name, id from users) users on users.id = operation.action_users_id where operation.end_action_date is null AND operation.action_users_id = $1',[users_id], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).send(results.rows);
    });
}

const listUserOperationFinish = (request, response) => {
    const users_id = request.headers.authorization;
    pool.query('Select * from item left join (select id as op_id, price_per_day as ppd, item_id, action_users_id, end_action_date, action_date from operation) operation on operation.item_id = item.id left join (select users.name as user_name, id from users) users on users.id = operation.action_users_id where operation.end_action_date is not null AND operation.action_users_id = $1',[users_id], (error, results) => {
        if(error){
            throw error;
        }
        return response.status(200).send(results.rows);
    });
}

const registerUser = (request, response) => {
    const body = request.body;

    pool.query('INSERT INTO users (name, usr, psw) VALUES ($1, $2, $3)', [body.name, body.usr, body.psw], (error, result) => {   
        if (error) {
            throw error;
        }
        return response.status(201).send('User added with success!');
    });
}

const loginUser = (request, response) => {
    const { usr, psw } = request.body;
    
    pool.query('SELECT * FROM users WHERE usr = $1 AND psw = $2', [usr, psw], (error, results) => {
        if(error){
            throw error;
        }
        if(!results.rows.length){
            return response.status(401).send('Wrong user or password.');
        }
        return response.status(200).send(results.rows);
     });
}

module.exports = {
    listUserOperationFinish,
    listUserOperationOpen,
    listOperationItemUser,
    registerUser,
    loginUser
}