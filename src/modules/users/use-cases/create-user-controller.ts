import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './create-user';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, age, weight, ethnicity } = request.body;

    const createUserUsecase = container.resolve(CreateUserUseCase);

    await createUserUsecase.execute({
      name,
      phone,
      email,
      age,
      weight,
      ethnicity,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
