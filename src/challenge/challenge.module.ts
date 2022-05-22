import { Module } from "@nestjs/common";
import { ChallengeService } from "./challenge.service";
import { ChallengeController } from "./challenge.controller";
import { DatabaseModule } from "src/database/database.module";
import { ChallengeProviders } from "./challenge.provider";

@Module({
  imports: [DatabaseModule],
  providers: [ChallengeService, ...ChallengeProviders],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
