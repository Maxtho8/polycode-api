import { Module } from "@nestjs/common";

// import { AuthService } from "./auth/auth.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
