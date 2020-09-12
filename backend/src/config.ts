import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "root",
	password: "admin",
	logging: false,
	entities: [`${__dirname}/models/entities/index{.ts,*.js}`],
	migrations: [`${__dirname}/db/migrations/{.ts,*.js}`],
	migrationsRun: true
};

export { typeOrmConfig };
