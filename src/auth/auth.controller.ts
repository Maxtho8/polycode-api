import { Controller, Post, Body } from "@nestjs/common";
import { RegisterDto } from "./register.dto";
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { LoginStatus } from "./auth.service";
import { UserDto } from "src/users/users.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("register")
  public async register(@Body() createUserDto: RegisterDto): Promise<any> {
    return await this.authService.register(createUserDto);
  }
  @Post("login")
  public async login(@Body() loginUserDto: LoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
