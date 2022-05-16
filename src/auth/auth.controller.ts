import { Controller, Post, Body } from "@nestjs/common";
import { RegisterDto } from "./register.dto";
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { LoginStatus } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("register")
  public async register(@Body() createUserDto: RegisterDto): Promise<boolean> {
    const result: boolean = await this.authService.register(createUserDto);
    if (!result) {
      throw new HttpException("Can't register user", HttpStatus.BAD_REQUEST);
    }
    return result;
  }
  @Post("login")
  public async login(@Body() loginUserDto: LoginDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
