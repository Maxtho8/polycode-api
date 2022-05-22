import { Controller, Get, Param } from "@nestjs/common";
import { ChallengeDto } from "./challenge.dto";
import { ChallengeService } from "./challenge.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("challenge")
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  //get all challenges json
  @UseGuards(AuthGuard())
  @Get()
  public async getAllChallenges(): Promise<ChallengeDto[]> {
    return this.challengeService.getAllChallenges();
  }

  //get challenge json by id
  @UseGuards(AuthGuard())
  @Get(":id")
  public async getChallenge(@Param("id") id): Promise<ChallengeDto> {
    return this.challengeService.getChallenge(id);
  }
}
