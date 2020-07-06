import { Inject } from "typedi";
import UserService from "../service/user.service";
import { User } from "../entities/user.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { UserDto } from "../dto/user.dto";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/users/register")
	async register(@Body() registerInfo: UserDto) {
		return await this.userService.register(registerInfo.username, registerInfo.password);
	}

	@Post("/users/login")
	async login(@Body() registerInfo: UserDto) {
		return await this.userService.login(registerInfo.username, registerInfo.password);
	}

}