import { Inject } from "typedi";
import UserService from "../service/user.service";
import { User } from "../entities/user.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { LoginDto } from "../dto/user.dto";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/users/login")
	async login(@Body() loginInfo: LoginDto) {
		return await this.userService.login(loginInfo.username, loginInfo.password);
	}

}