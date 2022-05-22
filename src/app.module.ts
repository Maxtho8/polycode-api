import { Module } from "@nestjs/common";
// import { AuthService } from "./auth/auth.service"
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { ChallengeModule } from "./challenge/challenge.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, DatabaseModule, ChallengeModule, PassportModule],
  providers: [],
})
export class AppModule {}
