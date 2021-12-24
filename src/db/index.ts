import { Sequelize } from 'sequelize-typescript';
import { User, Trade } from './models';

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
		models: [User, Trade],
	});

	User.sync({ alter: true });
	Trade.sync({ alter: true });
	await db.authenticate();
}

function sql() {
	return db;
}

export { initdb, sql };
