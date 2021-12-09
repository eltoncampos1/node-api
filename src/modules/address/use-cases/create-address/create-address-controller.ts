import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAddressUseCase } from './create-address';

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const { city, number, state, street, zip_code, complement } = request.body;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    await createAddressUseCase.execute({ userId, complement, zip_code, number, city, street, state });

    return response.status(201).send();
  }
}

export { CreateAddressController };
