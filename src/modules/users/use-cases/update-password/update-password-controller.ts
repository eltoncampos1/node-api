import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePasswordUseCase } from './update-profile';

class UpdatePasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { password, old_password } = request.body;

    const updatePasswordUseCase = container.resolve(UpdatePasswordUseCase);

    await updatePasswordUseCase.execute({ user_id: id, password, old_password });

    return response.status(200).send();
  }
}

export { UpdatePasswordController };
