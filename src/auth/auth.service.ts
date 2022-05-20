import { Injectable } from "@nestjs/common";
import { UsersService } from "./../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./register.dto";
import { LoginDto } from "./login.dto";
import { UserDto } from "./../users/users.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export interface LoginStatus {
  username: string;
  token: string;
}

export interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(userDto: RegisterDto): Promise<UserDto> {
    const user = await this.usersService.create(userDto);
    return user;
  }

  async login(loginUserDto: LoginDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  private _createToken(user: UserDto): any {
    const accessToken = this.jwtService.sign({ email: user.email, password: user.id }, { expiresIn: process.env.EXPIRESIN });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
