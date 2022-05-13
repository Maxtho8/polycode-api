import { Controller, Get, Body, ParseIntPipe, Post, Put } from "@nestjs/common";
import { LoginDto } from "src/login/login.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.usersService.findByLogin(loginDto);
  }
}
