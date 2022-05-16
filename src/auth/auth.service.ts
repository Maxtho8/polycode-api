import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
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
  comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async register(userDto: RegisterDto): Promise<boolean> {
    try {
      await this.usersService.create(userDto);
    } catch (err) {
      return false;
    }
    return true;
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
    const accessToken = this.jwtService.sign(user);
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
