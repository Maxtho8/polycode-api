import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "./../database/database.module";
import { UsersProviders } from "./users.provider";

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...UsersProviders],
  controllers: [],
})
export class UsersModule {}
