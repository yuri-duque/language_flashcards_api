import { Response, Router } from 'express';
import { AuthService } from '../../service';
import { requestRefreshTokenSchema } from './validationSchema';
import { validationQueryParams } from '../../utils/validationRequest';
import { RequestWithQuery } from '../../../@types/express';
import { RefreshTokenQueryParams } from './types';

const authRouter = Router();

authRouter.get(
  '/auth/refreshToken',
  async (req: RequestWithQuery<RefreshTokenQueryParams>, res: Response) => {
    try {
      const params = req.query;
      await validationQueryParams(params, requestRefreshTokenSchema);

      const authService = new AuthService();
      const token = await authService.refreshToken(params.refreshToken);

      const response = {
        token,
      };

      res.success({ data: response });
    } catch (error) {
      res.error({ error: error as Error, message: 'Error to refresh token' });
    }
  },
);

export { authRouter };
