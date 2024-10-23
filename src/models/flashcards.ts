import { BaseModel } from '@config/model/baseModel';

export interface Flashcards extends BaseModel {
  name: string;
  numberOfCards: number;
}
