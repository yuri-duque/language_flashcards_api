import { BaseModel } from '../config/model/baseModel';

export interface User extends BaseModel {
  name: string;
  email: string;
}
