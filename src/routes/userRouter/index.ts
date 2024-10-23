import { Request, Response, Router } from 'express';
import { UserService } from '../../services';

const userRouter = Router();

userRouter.get('/user', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();
    const users = await userService.listUsers();

    const response = {
      users,
    };

    res.success({ data: response });
  } catch (error) {
    res.error({ error: error as Error, message: 'Error to list users' });
  }
});

export { userRouter };
