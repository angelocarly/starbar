import { Inject } from "typedi";
import UserService from "../services/user.service";
import { Authorized, Body, JsonController, Post } from "routing-controllers";
import { LoginDTO } from "../models/dto/login.dto";
import { LoginResponse } from "../models/response/login.response";
import { PasswordDto } from "../models/dto/password.dto";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/login")
	async login(@Body() { password }: LoginDTO): Promise<LoginResponse> {
		return { token: await this.userService.login("admin", password) };
	}

	/**
	 * Update the admin's password
	 * @returns A new session token
	 */
	@Authorized()
	@Post("/changepassword")
	async changePassword(@Body() { password }: PasswordDto): Promise<LoginResponse> {
		return { token: await this.userService.changePassword("admin", password) };
	}
}
