import { Sequelize } from 'sequelize';

export let sequelize: Sequelize;

export async function initdb() {
	let url = process.env.DATABASE_URL || '';
	if (!url) console.error('no url');

	const splitted = url.split(/[\/:@]/g);

	sequelize = new Sequelize({
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
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
