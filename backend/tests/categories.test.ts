import { SuperTest, Test } from "supertest";
import { Category } from "../src/models/entities";
import { setupTestingServer, tearDownTestingServer } from "./testing.utils";

describe("Category integration tests", () => {

	let http: SuperTest<Test>;

	beforeAll(async () => http = await setupTestingServer());
	afterAll(async () => await tearDownTestingServer());

	it("should return all categories", async () => {

		const categories: Category[] = [{ id: 1, name: "Bieren" }];

		const { body } = await http.get("/categories").expect(200);
		expect(body).toBe(categories);
	});
});
