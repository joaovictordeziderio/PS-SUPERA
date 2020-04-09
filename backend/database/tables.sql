CREATE TABLE users (
	id serial PRIMARY KEY,
	name character varying(50) NOT NULL,
	usr character varying(50) NOT NULL UNIQUE,
	psw character varying(50) NOT NULL
);

CREATE TABLE item (
	id serial PRIMARY KEY,
	users_id serial,
	name character varying(50) NOT NULL,
	price_per_day float,
	is_active boolean NOT NULL,
	FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE operation (
	id serial PRIMARY KEY,
	action_users_id serial REFERENCES users(id),
	item_id serial REFERENCES item(id),
	price_per_day float,
	action_date date NOT NULL DEFAULT CURRENT_DATE,
	end_action_date date NOT NULL
);