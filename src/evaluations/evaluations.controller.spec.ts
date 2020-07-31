import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {EvaluationsController} from './evaluations.controller';
import {DatabaseService} from '../database/database.service';
import {DatabaseModule} from '../database/database.module';
import {EvaluationsService} from '../evaluations/evaluations.service';
import {EVALUATION_DTO, ID, EVALUATION_CREATE} from '../../test/constants/evaluations-test.constant'
// Test suite for the EvaluationsController
describe('EvaluationsController Unit Tests', () => {
  let evaluationsController: EvaluationsController;
  let evaluationsService: EvaluationsService;
  let module: TestingModule;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EvaluationsController],
      imports: [DatabaseModule],
      providers: [
        DatabaseService,
        {
          provide: EvaluationsService,
          useFactory: () => ({
            // These mock functions are used for the basic 'positive' tests
            create: jest.fn(() => EVALUATION_DTO),
            findById: jest.fn(() => EVALUATION_DTO),
            update: jest.fn(() => EVALUATION_DTO),
            remove: jest.fn(() => EVALUATION_DTO)
          })
        }
      ]
    }).compile();

    evaluationsService = module.get<EvaluationsService>(EvaluationsService);
    evaluationsController = module.get<EvaluationsController>(
      EvaluationsController
    );
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  beforeEach(() => {
    return databaseService.cleanAll();
  });

  describe('FindbyId function', () => {
    // Tests the findById function with valid ID (basic positive test)
    it('should test findById with valid ID', async () => {
      expect(await evaluationsController.findById(ID)).toBe(EVALUATION_DTO);
      expect(evaluationsService.findById).toHaveReturnedWith(EVALUATION_DTO);
    });

    // Tests the findById function with ID that is 'not found'
    it('should test findById with invalid ID', async () => {
      jest.spyOn(evaluationsService, 'findById').mockImplementation(() => {
        throw new NotFoundException();
      });
      expect(async () => {
        await evaluationsController.findById(ID);
      }).rejects.toThrow(NotFoundException);
    });
   });

  describe('Create function', () => {
    // Tests the create function with valid dto (basic positive test)
    it('should test the create function with valid dto', async () => {
      expect(await evaluationsController.create(EVALUATION_CREATE)).toBe(EVALUATION_DTO);
      expect(evaluationsService.create).toHaveReturnedWith(EVALUATION_DTO);
    });


  //   // Tests the create function with dto that is missing password
  //   it('should test the create function with missing password field', async () => {
  //     jest.spyOn(usersService, 'create').mockImplementation(() => {
  //       throw new BadRequestException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.create(
  //         CREATE_EVALUATION_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD
  //       );
  //     }).rejects.toThrow(BadRequestException);
  //   });
  //
  //   // Tests the create function with dto that is missing passwordConfirmation
  //   it('should test the create function with missing password confirmation field', async () => {
  //     jest.spyOn(usersService, 'create').mockImplementation(() => {
  //       throw new BadRequestException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.create(
  //         CREATE_EVALUATION_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_CONFIRMATION_FIELD
  //       );
  //     }).rejects.toThrow(BadRequestException);
  //   });
   });
  //
  // describe('Update function', () => {
  //   // Tests the update function with valid dto (basic positive test)
  //   it('should test the update function with a valid update dto', async () => {
  //     expect(
  //       await evaluationsController.update(
  //         'user',
  //         ID,
  //         UPDATE_EVALUATION_DTO_TEST_OBJ
  //       )
  //     ).toEqual(EVALUATION_USER_DTO);
  //     expect(usersService.update).toHaveReturnedWith(EVALUATION_USER_DTO);
  //   });
  //
  //   // Tests the update function with ID that is 'not found'
  //   it('should test update function with invalid ID', async () => {
  //     jest.spyOn(usersService, 'update').mockImplementation(() => {
  //       throw new NotFoundException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.update(
  //         'user',
  //         ID,
  //         UPDATE_EVALUATION_DTO_TEST_OBJ
  //       );
  //     }).rejects.toThrow(NotFoundException);
  //   });
  //
  //   // Tests the update function with dto that is missing currentPassword
  //   it('should test the update function with a dto that is missing currentPassword field', async () => {
  //     jest.spyOn(usersService, 'update').mockImplementation(() => {
  //       throw new BadRequestException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.update(
  //         'user',
  //         ID,
  //         UPDATE_EVALUATION_DTO_WITH_MISSING_CURRENT_PASSWORD_FIELD
  //       );
  //     }).rejects.toThrow(BadRequestException);
  //   });
  // });
  //
  // describe('Remove function', () => {
  //   // Tests the remove function with valid dto (basic positive test)
  //   it('should remove', async () => {
  //     expect(
  //       await evaluationsController.remove(ID, DELETE_EVALUATION_DTO_TEST_OBJ)
  //     ).toEqual(EVALUATION_ONE_DTO);
  //     expect(usersService.remove).toHaveReturnedWith(EVALUATION_ONE_DTO);
  //   });
  //
  //   // Tests the remove function with ID that is 'not found'
  //   it('should test remove function with invalid ID', async () => {
  //     jest.spyOn(usersService, 'remove').mockImplementation(() => {
  //       throw new NotFoundException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.remove(ID, DELETE_EVALUATION_DTO_TEST_OBJ);
  //     }).rejects.toThrow(NotFoundException);
  //   });
  //
  //   // Tests the remove function with dto that is missing password
  //   it('should test remove function with a dto that is missing password field', async () => {
  //     jest.spyOn(usersService, 'remove').mockImplementation(() => {
  //       throw new BadRequestException();
  //     });
  //     expect(async () => {
  //       await evaluationsController.remove(
  //         ID,
  //         DELETE_EVALUATION_DTO_TEST_OBJ_WITH_MISSING_PASSWORD
  //       );
  //     }).rejects.toThrow(BadRequestException);
  //   });
  // });

  afterAll(async () => {
    await databaseService.cleanAll();
    await databaseService.closeConnection();
  });
});
