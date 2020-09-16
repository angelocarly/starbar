import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
	type: "postgres",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME || "root",
	password: process.env.DB_PASSWORD || "admin",
	database: process.env.DB_NAME || "development",
	logging: false,
	entities: [`${__dirname}/models/entities/index{.ts,*.js}`],
	migrations: [`${__dirname}/db/migrations/{.ts,*.js}`],
	migrationsRun: true
};

export { typeOrmConfig };
