import {CreateEvaluationDto} from '../../src/evaluations/dto/create-evaluation.dto';
import {UpdateEvaluationDto} from '../../src/evaluations/dto/update-evaluation.dto';
import {EvaluationDto} from '../../src/evaluations/dto/evaluation.dto';
import {EVALUATION_TAG_DTO_ARRAY} from '../../test/constants/evaluation-tags-test.contant';
// eslint-disable @typescript-eslint/ban-ts-ignore


// @ts-ignore
export const EVALUATION_CREATE: CreateEvaluationDto = {
  data: {},
  version: '1.0',
  evaluationTags: []
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
export const EVALUATION_UPDATE: UpdateEvaluationDto = {
  data: {},
  version: '1.0',
  evaluationTags: []
};

// @ts-ignore
export const ID = 10001;

/* eslint-enable @typescript-eslint/ban-ts-ignore */
