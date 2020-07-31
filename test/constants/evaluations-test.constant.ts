import {CreateEvaluationDto} from '../../src/evaluations/dto/create-evaluation.dto';
import {UpdateEvaluationDto} from '../../src/evaluations/dto/update-evaluation.dto';
import {EvaluationDto} from '../../src/evaluations/dto/evaluation.dto';
import {EVALUATION_TAG_DTO_ARRAY, EVALUATION_TAG_ARRAY} from '../../test/constants/evaluation-tags-test.contant';
import {Evaluation} from '../../src/evaluations/evaluation.model';
/* eslint-disable @typescript-eslint/ban-ts-ignore */

// @ts-ignore
export const ID = 10001;

// @ts-ignore
export const TEST_EVALUATION: Evaluation = {
  id: ID,
  version: '1.0',
  data: {},
  createdAt: new Date(),
  updatedAt: new Date(),
  evaluationTags: EVALUATION_TAG_ARRAY
};

// @ts-ignore
export const EVALUATION_CREATE: CreateEvaluationDto = {
  data: {},
  version: '1.0',
  evaluationTags: EVALUATION_TAG_DTO_ARRAY
};

// @ts-ignore
export const EVALUATION_CREATE_2: CreateEvaluationDto = {
  data: {},
  version: '2.0',
  evaluationTags: EVALUATION_TAG_DTO_ARRAY
};

// @ts-ignore
export const EVALUATION_DTO: EvaluationDto = {
  id: 1,
  version: '1.0',
  data: {},
  evaluationTags: EVALUATION_TAG_DTO_ARRAY,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// @ts-ignore
export const EVALUATION_DTO_2: EvaluationDto = {
  id: 2,
  version: '1.0',
  data: {},
  evaluationTags: EVALUATION_TAG_DTO_ARRAY,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// @ts-ignore
export const EVALUATION_DTO_ARRAY: EvaluationDto[] = [EVALUATION_DTO, EVALUATION_DTO_2];

// @ts-ignore
export const EVALUATION_UPDATE: UpdateEvaluationDto = {
  data: {},
  version: '1.0',
  evaluationTags: []
};

/* eslint-enable @typescript-eslint/ban-ts-ignore */
