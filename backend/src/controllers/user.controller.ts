import { Inject } from "typedi";
import UserService from "../services/user.service";
import { User } from "../models/entities/user.entity";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { LoginDto } from "../models/dto/user.dto";

@JsonController()
export class UserController {

	@Inject()
	private userService!: UserService;

	@Post("/login")
	async login(@Body() loginInfo: LoginDto) {
		return await this.userService.login(loginInfo.username, loginInfo.password);
	}

}