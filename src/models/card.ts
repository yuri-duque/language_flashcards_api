import { BaseModel } from '@config/model/baseModel';

export interface Card extends BaseModel {
  question: string;
  answer: string;
  category: string;
}
