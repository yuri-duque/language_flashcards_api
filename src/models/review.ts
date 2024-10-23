import { BaseModel } from '@config/model/baseModel';

export interface Review extends BaseModel {
  cardId: string;
  easeFactor: number;
  interval: number;
  nextReview: Date;
  reviewDate: Date;
  repetitions: number;
}
