import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
	type: "sqlite",
	database: "database/excuze.sqlite",
	synchronize: true,
	logging: false,
	entities: [`${__dirname}/models/entities/index{.ts,*.js}`],
	migrations: [`${__dirname}/db/migrations/{.ts,*.js}`],
	migrationsRun: true
};

export { typeOrmConfig };
