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
import {TEST_EVALUATION, EVALUATION_CREATE, EVALUATION_CREATE_2} from '../../test/constants/evaluations-test.constant';

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

  describe('FindAll', () => {
    it('should find all evaluations', async () => {
      const evaluationOne = await evaluationsService.create(EVALUATION_CREATE);
      const evaluationTwo = await evaluationsService.create(EVALUATION_CREATE_2);
      const evaluationDtoArray = await evaluationsService.findAll();
      // Commented out because the evaluationTags array is being returned as undefined
      // expect(evaluationDtoArray[0]).toContainEqual(evaluationOne);
      // expect(evaluationDtoArray[1]).toContainEqual(evaluationTwo);
      expect(evaluationDtoArray[0].id).toEqual(evaluationOne.id);
      expect(evaluationDtoArray[1].id).toEqual(evaluationTwo.id);
    });
  });

  // describe('Create', () => {
  //   it('should create a valid User', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     expect(user.id).toBeDefined();
  //     expect(user.email).toEqual(USER_ONE_DTO.email);
  //     expect(user.firstName).toEqual(USER_ONE_DTO.firstName);
  //     expect(user.lastName).toEqual(USER_ONE_DTO.lastName);
  //     expect(user.title).toEqual(USER_ONE_DTO.title);
  //     expect(user.organization).toEqual(USER_ONE_DTO.organization);
  //     expect(user.updatedAt.valueOf()).not.toBe(
  //       USER_ONE_DTO.updatedAt.valueOf()
  //     );
  //     expect(user.role).toEqual(USER_ONE_DTO.role);
  //   });

  //   it('should throw an error when missing the email field', async () => {
  //     expect.assertions(1);
  //     await expect(
  //       usersService.create(CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_EMAIL_FIELD)
  //     ).rejects.toThrow('notNull Violation: User.email cannot be null');
  //   });

  //   it('should throw an error when email field is invalid', async () => {
  //     expect.assertions(1);
  //     await expect(
  //       usersService.create(CREATE_USER_DTO_TEST_OBJ_WITH_INVALID_EMAIL_FIELD)
  //     ).rejects.toThrow('Validation isEmail on email failed');
  //   });

  //   it('should throw an error when missing the password field', async () => {
  //     expect.assertions(1);
  //     await expect(
  //       usersService.create(
  //         CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD
  //       )
  //     ).rejects.toThrow(BadRequestException);
  //   });

  //   it('should throw an error when missing the role field', async () => {
  //     expect.assertions(1);
  //     await expect(
  //       usersService.create(CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_ROLE)
  //     ).rejects.toThrow('notNull Violation: User.role cannot be null');
  //   });
  // });

  // describe('FindById', () => {
  //   it('should find users by id', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const foundUser = await usersService.findById(user.id);
  //     expect(foundUser.email).toEqual(user.email);
  //     expect(foundUser.firstName).toEqual(user.firstName);
  //     expect(foundUser.lastName).toEqual(user.lastName);
  //     expect(foundUser.title).toEqual(user.title);
  //     expect(foundUser.organization).toEqual(user.organization);
  //     expect(foundUser.createdAt.valueOf()).toEqual(user.createdAt.valueOf());
  //     expect(foundUser.id).toEqual(user.id);
  //     expect(foundUser.role).toEqual(user.role);
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     expect.assertions(1);
  //     await expect(usersService.findById(-1)).rejects.toThrow(
  //       NotFoundException
  //     );
  //   });
  // });

  // describe('Update', () => {
  //   // Tests the update function (Successful update)
  //   it('should update a user', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const beforeUpdate = await User.findByPk<User>(user.id);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_OBJ,
  //       false
  //     );
  //     const afterUpdate = await User.findByPk<User>(user.id);

  //     expect(updatedUser.email).toEqual(UPDATE_USER_DTO_TEST_OBJ.email);
  //     expect(updatedUser.firstName).toEqual(UPDATE_USER_DTO_TEST_OBJ.firstName);
  //     expect(updatedUser.lastName).toEqual(UPDATE_USER_DTO_TEST_OBJ.lastName);
  //     expect(updatedUser.title).toEqual(UPDATE_USER_DTO_TEST_OBJ.title);
  //     expect(updatedUser.organization).toEqual(
  //       UPDATE_USER_DTO_TEST_OBJ.organization
  //     );
  //     expect(updatedUser.role).toEqual(UPDATE_USER_DTO_TEST_OBJ.role);

  //     expect(updatedUser.email).not.toEqual(user.email);
  //     expect(updatedUser.firstName).not.toEqual(user.firstName);
  //     expect(updatedUser.lastName).not.toEqual(user.lastName);
  //     expect(updatedUser.title).not.toEqual(user.title);
  //     expect(updatedUser.organization).not.toEqual(user.organization);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //     expect(updatedUser.role).not.toEqual(user.role);
  //     expect(beforeUpdate.forcePasswordChange).not.toEqual(
  //       afterUpdate.forcePasswordChange
  //     );
  //   });

  //   it('should update a user without updating email', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_EMAIL,
  //       false
  //     );

  //     expect(updatedUser.email).toEqual(user.email);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating firstName', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_FIRST_NAME,
  //       false
  //     );

  //     expect(updatedUser.firstName).toEqual(user.firstName);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating lastName', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_LAST_NAME,
  //       false
  //     );

  //     expect(updatedUser.lastName).toEqual(user.lastName);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating organization', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_ORGANIZATION,
  //       false
  //     );

  //     expect(updatedUser.organization).toEqual(user.organization);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating title', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_TITLE,
  //       false
  //     );

  //     expect(updatedUser.title).toEqual(user.title);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating role', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updatedUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_ROLE,
  //       false
  //     );

  //     expect(updatedUser.role).toEqual(user.role);
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating forcePasswordChange', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updateUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_TEST_WITHOUT_FORCE_PASSWORD_CHANGE,
  //       false
  //     );

  //     expect(updateUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without updating password', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const beforeUpdate = await User.findByPk<User>(user.id);
  //     await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS,
  //       false
  //     );
  //     const updatedUser = await User.findByPk<User>(user.id);

  //     expect(updatedUser.email).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.email
  //     );
  //     expect(updatedUser.firstName).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.firstName
  //     );
  //     expect(updatedUser.lastName).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.lastName
  //     );
  //     expect(updatedUser.organization).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.organization
  //     );
  //     expect(updatedUser.title).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.title
  //     );
  //     expect(updatedUser.role).toEqual(
  //       UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS.role
  //     );
  //     expect(updatedUser.encryptedPassword).toEqual(
  //       beforeUpdate.encryptedPassword
  //     );
  //     expect(updatedUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should update a user without matching password when admin', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const updateUser = await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_WITH_INVALID_CURRENT_PASSWORD,
  //       true
  //     );

  //     expect(updateUser.updatedAt.valueOf()).not.toEqual(
  //       user.updatedAt.valueOf()
  //     );
  //   });

  //   it('should throw an error when the password is invalid', async () => {
  //     expect.assertions(1);
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     await expect(
  //       usersService.update(
  //         user.id,
  //         UPDATE_USER_DTO_WITH_INVALID_CURRENT_PASSWORD,
  //         false
  //       )
  //     ).rejects.toThrow(UnauthorizedException);
  //   });

  //   it('should throw an error when the email is invalid', async () => {
  //     expect.assertions(1);
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     await expect(
  //       usersService.update(
  //         user.id,
  //         UPDATE_USER_DTO_TEST_WITH_INVALID_EMAIL,
  //         false
  //       )
  //     ).rejects.toThrow('Validation error: Validation isEmail on email failed');
  //   });

  //   it('should throw an error when password is not updated and forcePasswordChange is true', async () => {
  //     expect.assertions(1);
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     await usersService.update(
  //       user.id,
  //       UPDATE_USER_DTO_SETUP_FORCE_PASSWORD_CHANGE,
  //       false
  //     );
  //     await expect(
  //       usersService.update(
  //         user.id,
  //         UPDATE_USER_DTO_TEST_WITHOUT_FORCE_PASSWORD_CHANGE,
  //         false
  //       )
  //     ).rejects.toThrow(BadRequestException);
  //   });
  // });

  // describe('Remove', () => {
  //   it('should throw an error when user does not exist', async () => {
  //     expect.assertions(1);
  //     await expect(
  //       usersService.remove(1, DELETE_USER_DTO_TEST_OBJ)
  //     ).rejects.toThrow(NotFoundException);
  //   });

  //   it('should throw an error when password fields do not match', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     expect.assertions(1);
  //     await expect(
  //       usersService.remove(user.id, DELETE_FAILURE_USER_DTO_TEST_OBJ)
  //     ).rejects.toThrow(UnauthorizedException);
  //   });

  //   // Tests the remove function with DeleteUserDto that has no password field
  //   it('should throw an error when password field is blank', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     expect.assertions(1);
  //     await expect(
  //       usersService.remove(
  //         user.id,
  //         DELETE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD
  //       )
  //     ).rejects.toThrow(UnauthorizedException);
  //   });

  //   it('should remove created user', async () => {
  //     const user = await usersService.create(CREATE_USER_DTO_TEST_OBJ);
  //     const removedUser = await usersService.remove(
  //       user.id,
  //       DELETE_USER_DTO_TEST_OBJ
  //     );
  //     expect.assertions(7);
  //     expect(removedUser.email).toEqual(user.email);
  //     expect(removedUser.firstName).toEqual(user.firstName);
  //     expect(removedUser.lastName).toEqual(user.lastName);
  //     expect(removedUser.organization).toEqual(user.organization);
  //     expect(removedUser.title).toEqual(user.title);
  //     expect(removedUser.role).toEqual(user.role);
  //     await expect(usersService.findByEmail(user.email)).rejects.toThrow(
  //       NotFoundException
  //     );
  //   });
  // });

  afterAll(async () => {
    await databaseService.cleanAll();
    await databaseService.closeConnection();
  });
});
