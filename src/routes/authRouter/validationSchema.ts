import * as yup from 'yup';

export const requestRefreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required(),
});
