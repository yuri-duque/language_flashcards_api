import { BaseModel } from '@config/model/baseModel';

export interface Review extends BaseModel {
  rating: number;
  reviewDate: Date;
  expectedReviewDate: Date;
}
