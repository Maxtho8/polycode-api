import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "./../users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../database/database.module";
import { UsersProviders } from "../users/users.provider";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    JwtModule.register({
      secret: `${process.env.TOKEN_SECRET}`,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, ...UsersProviders],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
