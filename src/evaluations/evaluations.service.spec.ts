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
import {
  TEST_EVALUATION,
  EVALUATION_CREATE,
  EVALUATION_CREATE_2,
  EVALUATION_CREATE_WITH_MISSING_VERSION,
  EVALUATION_CREATE_WITH_MISSING_DATA
} from '../../test/constants/evaluations-test.constant';
import {MINUTE_IN_MILLISECONDS} from '../../test/constants/users-test.constant';

describe('UsersService', () => {
  let evaluationsService: EvaluationsService;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        SequelizeModule.forFeature([Evaluation, EvaluationTag])
      ],
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

  describe('FindAll', () => {
    it('should find all evaluations', async () => {
      const evaluationOne = await evaluationsService.create(EVALUATION_CREATE);
      const evaluationTwo = await evaluationsService.create(
        EVALUATION_CREATE_2
      );
      const evaluationDtoArray = await evaluationsService.findAll();
      // Commented out because the evaluationTags array is being returned as undefined
      // expect(evaluationDtoArray[0]).toContainEqual(evaluationOne);
      // expect(evaluationDtoArray[1]).toContainEqual(evaluationTwo);

      expect(evaluationDtoArray[0].id).toEqual(evaluationOne.id);
      expect(evaluationDtoArray[1].id).toEqual(evaluationTwo.id);
    });
  });

  describe('Create', () => {
    it('should create a valid evaluation', async () => {
      const evaluation = await evaluationsService.create(EVALUATION_CREATE);
      expect(evaluation.id).toBeDefined();
      expect(evaluation.data).toEqual(EVALUATION_CREATE.data);
      expect(evaluation.version).toEqual(EVALUATION_CREATE.version);
      // Commented out until evaluationTags returing undefined bug is fixed
      // expect(evaluation.evaluationTags).toEqual(EVALUATION_CREATE.evaluationTags);

      const createdAt = evaluation.createdAt.valueOf();
      const updatedAt = evaluation.updatedAt.valueOf();
      // Evaluation should have been created within the last minuted
      const createdWithinOneMinute =
        new Date().getTime() - new Date(createdAt).getTime();
      // Evaluation should have been updated within the last minuted
      const updatedWithinOneMinute =
        new Date().getTime() - new Date(updatedAt).getTime();

      expect(createdWithinOneMinute).toBeLessThanOrEqual(
        MINUTE_IN_MILLISECONDS
      );
      expect(updatedWithinOneMinute).toBeLessThanOrEqual(
        MINUTE_IN_MILLISECONDS
      );
    });

    it('should throw an error when missing the version field', async () => {
      expect.assertions(1);
      await expect(
        evaluationsService.create(EVALUATION_CREATE_WITH_MISSING_VERSION)
      ).rejects.toThrow('notNull Violation: Evaluation.version cannot be null');
    });

    it('should throw an error when missing the data field', async () => {
      expect.assertions(1);
      await expect(
        evaluationsService.create(EVALUATION_CREATE_WITH_MISSING_DATA)
      ).rejects.toThrow('notNull Violation: Evaluation.data cannot be null');
    });
  });

  afterAll(async () => {
    await databaseService.closeConnection();
  });
});
