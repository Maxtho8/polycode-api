import { Inject, Injectable } from "@nestjs/common";
import { ChallengeEntity } from "./challenge.entity";
import { Repository } from "typeorm";
import { ChallengeDto } from "./challenge.dto";

@Injectable()
export class ChallengeService {
  constructor(
    @Inject("ChallengeRepository")
    private ChallengeRepository: Repository<ChallengeEntity>,
  ) {}

  toChallengeDto = (data: ChallengeEntity): ChallengeDto => {
    const { id, title, description, expected, langage, img_path } = data;
    const challengeDto = { id, title, description, expected, langage, img_path };
    return challengeDto;
  };

  async getAllChallenges(): Promise<ChallengeDto[]> {
    const challenges = await this.ChallengeRepository.find();
    return challenges.map(challenge => this.toChallengeDto(challenge));
  }

  async getChallenge(id: string): Promise<ChallengeDto> {
    return this.toChallengeDto(await this.ChallengeRepository.findOne({ where: { id: id } }));
  }

  async createChallenge(challenge: ChallengeDto): Promise<ChallengeEntity> {
    const { title, description, expected, langage, img_path } = challenge;
    const newChallenge = this.ChallengeRepository.create({
      title,
      description,
      expected,
      langage,
      img_path,
    });
    return await this.ChallengeRepository.save(newChallenge);
  }
}
