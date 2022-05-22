import { Controller, Get, Param } from "@nestjs/common";
import { ChallengeDto } from "./challenge.dto";
import { ChallengeService } from "./challenge.service";

@Controller("challenge")
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  //get all challenges json

  @Get()
  public async getAllChallenges(): Promise<ChallengeDto[]> {
    return this.challengeService.getAllChallenges();
  }

  //get challenge json by id
  @Get(":id")
  public async getChallenge(@Param("id") id): Promise<ChallengeDto> {
    return this.challengeService.getChallenge(id);
  }
}
