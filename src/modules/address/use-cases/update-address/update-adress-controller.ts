import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAddressUseCase } from './update-address';

class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const { city, state, street, number, zip_code, complement } = request.body;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    await updateAddressUseCase.execute({ userId, city, state, street, number, zip_code, complement });

    return response.status(200).send();
  }
}

export { UpdateAddressController };
