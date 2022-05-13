import { Injectable, Inject } from "@nestjs/common";
import { cp, cpSync } from "fs";
import { UserEntity } from "./users.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserDto } from "./users.dto";
import { LoginDto } from "src/auth/login.dto";
import { RegisterDto } from "src/auth/register.dto";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject("UsersRepository")
    private UsersRepository: Repository<UserEntity>,
  ) {}

  toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email } = data;
    const userDto: UserDto = { id, username, email };
    return userDto;
  };

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.UsersRepository.findOne(options);
    return this.toUserDto(user);
  }

  async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
    const user = await this.UsersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = 1; //await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return this.toUserDto(user);
  }

  async create(user: RegisterDto): Promise<UserDto> {
    const { username, email, password } = user;
    // check if user exists
    const userExists = await this.UsersRepository.findOne({
      where: { username },
    });
    if (userExists) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    // create user
    const newUser = await this.UsersRepository.create(user);
    await this.UsersRepository.save(newUser);
    return this.toUserDto(newUser);
  }
}
