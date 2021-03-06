import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { encode } from "jwt-simple";
import * as crypto from "crypto";

@Entity("user")
@Unique(["name"])
export class User {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @Column()
	public hash?: string;

    @Column()
	public salt?: string;

    constructor(name: string, password? : string) {
    	this.name = name;
    	password && this.setPassword(password);
    }

    setPassword(password: string): void {
    	this.salt = crypto.randomBytes(32).toString("hex");
    	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512").toString("hex");
    }

    validatePassword(password: string): boolean {
    	return this.hash === crypto.pbkdf2Sync(password, this.salt!, 10000, 64, "sha512").toString("hex");
    }

    generateJWT(): string {

    	const date = new Date();
    	const exp = new Date(date);
    	exp.setDate(date.getDate() + 60);

    	return encode({
    		_id: this.id,
    		username: this.name,
    		exp: exp.getTime()
    		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    	}, process.env.BACKEND_SECRET!, "HS512");

    }
}
