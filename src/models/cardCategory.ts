import { BaseModel } from '@config/model/baseModel';

export interface CardCategory extends BaseModel {
  name: string;
  description: string;
}
