import {CreateEvaluationTagDto} from '../../src/evaluation-tags/dto/create-evaluation-tag.dto';
import {EvaluationTag} from '../../src/evaluation-tags/evaluation-tag.model';
import {EvaluationTagDto} from '../../src/evaluation-tags/dto/evaluation-tag.dto';
import {UpdateEvaluationTagDto} from '../../src/evaluation-tags/dto/update-evaluation-tag.dto';

/* eslint-disable @typescript-eslint/ban-ts-ignore */

// @ts-ignore
export const EVALUATION_TAG_1: EvaluationTag = {
  key: 'key string',
  value: 'value string',
  evaluationId: 1
};

export const EVALUATION_TAG_DTO: EvaluationTagDto = {
  id: 10001,
  key: 'key string',
  value: 'value string',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const CREATE_EVALUATION_TAG_DTO: CreateEvaluationTagDto = {
  key: 'key string',
  value: 'value string'
};

// @ts-ignore
export const CREATE_EVALUATION_TAG_DTO_MISSING_KEY: CreateEvaluationTagDto = {
  value: 'value string'
};

// @ts-ignore
export const CREATE_EVALUATION_TAG_DTO_MISSING_VALUE: CreateEvaluationTagDto = {
  key: 'key string'
};

export const UPDATE_EVALUATION_TAG_DTO: UpdateEvaluationTagDto = {
  key: 'new key string',
  value: 'new value string'
};

// @ts-ignore
export const UPDATE_EVALUATION_TAG_DTO_MISSING_KEY: UpdateEvaluationTagDto = {
  value: 'new value string'
};

// @ts-ignore
export const UPDATE_EVALUATION_TAG_DTO_MISSING_VALUE: UpdateEvaluationTagDto = {
  key: 'new key string'
};

export const EVALUATION_TAG_DTO_ARRAY: EvaluationTagDto[] = [EVALUATION_TAG_DTO];


/* eslint-enable @typescript-eslint/ban-ts-ignore */
