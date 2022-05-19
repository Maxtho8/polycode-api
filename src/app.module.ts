import { Module } from "@nestjs/common";

// import { AuthService } from "./auth/auth.service"
import { UsersModule } from "./users/users.module";
import { LoginModule } from "./auth/login.module";

@Module({
  imports: [UsersModule, LoginModule],
})
export class AppModule {}
