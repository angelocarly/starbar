import { Server } from "http";
import { agent, SuperTest, Test } from "supertest";
import app from "../src/server";
import { Connection, getConnection, getConnectionManager, createConnection } from "typeorm";
import { typeOrmConfig } from "../src/config";
import { Container } from "typedi";
import { PDFTicketService } from "../src/services/ticket.service";

let server: Server;

export const setupTestingServer = async (): Promise<SuperTest<Test>> => {
	await ConnectionManagerWrapper.createConnection();
	Container.set("ticket.service", new PDFTicketService());
	return agent(server = app.listen());
};

export const tearDownTestingServer = (): Promise<void> => {
	return new Promise(resolve => {
		server.close(() => ConnectionManagerWrapper.closeAllConnections()
			.then(() => resolve()));
	});
};

export class ConnectionManagerWrapper {

	public static get connection(): Connection {
		return getConnection();
	}

	public static createConnection(): Promise<Connection> {
		return createConnection(typeOrmConfig);
	}

	public static async closeAllConnections(): Promise<void> {
		for (const connection of getConnectionManager().connections) {
			await connection.close();
		}
	}
}
