import pgPromise from 'pg-promise';
const pgp = pgPromise();
const cn = {
	host: 'localhost',
	port: 5433,
	database: 'testTask',
	user: 'postgres',
	password: '123',
	max: 30,
};
export const db = pgp(cn);
