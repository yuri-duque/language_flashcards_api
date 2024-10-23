export interface TranslateResult {
  text: string;
}

export interface TranslateParams {
  text: string;
  textLanguage?: string;
  targetLanguage?: string;
}

export interface GenerateExemplesResult {
  exemples: Array<string>;
}

export interface GenerateExemplesParams {
  text: string;
  textLanguage?: string;
  quantity?: number;
}
