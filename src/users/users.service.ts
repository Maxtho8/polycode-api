import { Injectable, Inject } from "@nestjs/common";
import { UserEntity } from "./users.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserDto } from "./users.dto";
import { LoginDto } from "./../auth/login.dto";
import { RegisterDto } from "./../auth/register.dto";
import { AuthService } from "./../auth/auth.service";
import { UpdateDto } from "./../auth/update.dto";

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
    private authService: AuthService,
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

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
    const user = await this.UsersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = this.authService.comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return this.toUserDto(user);
  }

  async create(user: RegisterDto): Promise<UserDto> {
    const { username, email } = user;
    // check if user exists
    let userExists = await this.UsersRepository.findOne({
      where: { username },
    });
    if (userExists) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    userExists = await this.UsersRepository.findOne({
      where: { email },
    });
    if (userExists) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
    // create user
    const newUser = await this.UsersRepository.create(user);
    await this.UsersRepository.save(newUser);
    return this.toUserDto(newUser);
  }

  async delete(email: string): Promise<boolean> {
    const user = await this.UsersRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }
    await this.UsersRepository.delete(user.id);
    return true;
  }

  async update(updateDto: UpdateDto): Promise<boolean> {
    const { oldEmail, newEmail } = updateDto;
    const user = await this.UsersRepository.findOne({ where: { email: oldEmail } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }
    await this.UsersRepository.update(user.id, { email: newEmail });
    return true;
  }
}
