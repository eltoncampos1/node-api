import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './update-user';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const { age, email, name, ethnicity, phone, weight } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({ user_id, age, email, name, ethnicity, phone, weight });

    return response.status(200).send();
  }
}

export { UpdateUserController };
