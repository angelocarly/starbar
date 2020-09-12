import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
	type: process.env.DB_TYPE || "postgres",
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
	username: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "admin",
	logging: false,
	entities: [`${__dirname}/models/entities/index{.ts,*.js}`],
	migrations: [`${__dirname}/db/migrations/{.ts,*.js}`],
	migrationsRun: true
};

export { typeOrmConfig };
