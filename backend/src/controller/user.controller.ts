import { Inject } from "typedi";
import UserService from "../service/user.service";
import { User } from "../entities/user.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { LoginDTO } from "../dto/login.dto";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/login")
	async login(@Body() loginInfo: LoginDTO) {
		return await this.userService.login("admin", loginInfo.password);
	}

}