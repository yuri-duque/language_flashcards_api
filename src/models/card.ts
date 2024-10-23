import { BaseModel } from '@config/model/baseModel';

export interface Card extends BaseModel {
  type: 'language' | 'question';
  question: string;
  answer: string;
  category: string;
  easeFactor: number;
  interval: number;
  nextReviewDate: Date;
  lastreviewDate: Date;
  repetitions: number;
}
