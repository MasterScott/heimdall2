import {Test} from '@nestjs/testing';
import {DatabaseModule} from '../database/database.module';
import {EvaluationsService} from './evaluations.service';
import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {DatabaseService} from '../database/database.service';
import {Evaluation} from './evaluation.model';
import {EvaluationTag} from '../../src/evaluation-tags/evaluation-tag.model';
import {EvaluationTagsService} from '../../src/evaluation-tags/evaluation-tags.service';
import {TEST_EVALUATION} from '../../test/constants/evaluations-test.constant';

describe('UsersService', () => {
  let evaluationsService: EvaluationsService;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, SequelizeModule.forFeature([Evaluation, EvaluationTag])],
      providers: [EvaluationsService, EvaluationTagsService, DatabaseService]
    }).compile();

    evaluationsService = module.get<EvaluationsService>(EvaluationsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  beforeEach(async () => {
    return await databaseService.cleanAll();
  });

  describe('exists', () => {
    it('throws an error when null', () => {
      expect(() => {
        evaluationsService.exists(null);
      }).toThrow(NotFoundException);
    });

    it('returns true when given a User', () => {
      expect(() => {
        evaluationsService.exists(TEST_EVALUATION);
      }).toBeTruthy();
    });
  });

  afterAll(async () => {
    await databaseService.cleanAll();
    await databaseService.closeConnection();
  });
});
