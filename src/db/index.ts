import sequelize, { Sequelize } from 'sequelize';
import { initModels } from './models';

let db: Sequelize;

async function initdb() {
	let url = process.env.DATABASE_URL || '';
	if (!url) console.error('no url');

	const splitted = url.split(/[\/:@]/g);

	db = new Sequelize({
		database: splitted[7],
		username: splitted[3],
		password: splitted[4],
		host: splitted[5],
		port: 5432,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
			},
		},
	});
	await db.authenticate();
	await initModels();
}

function sql() {
	return db;
}

export { initdb, sql };
