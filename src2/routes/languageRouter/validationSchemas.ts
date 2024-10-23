import * as yup from 'yup';

export const requestExempleSchema = yup.object().shape({
  text: yup.string().required(),
  textLanguage: yup.string(),
  quantity: yup.number(),
});

export const requestTranslateSchema = yup.object().shape({
  text: yup.string().required(),
  textLanguage: yup.string(),
  targetLanguage: yup.string(),
});
