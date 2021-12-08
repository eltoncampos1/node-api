import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserUseCase } from './delete-user';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute(user_id);

    return response.status(200).send();
  }
}

export { DeleteUserController };
