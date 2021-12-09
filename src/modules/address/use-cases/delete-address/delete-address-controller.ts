import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAddressUseCase } from './delete-address';

class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const deleteAddressUseCase = container.resolve(DeleteAddressUseCase);

    await deleteAddressUseCase.execute(user_id);

    return response.status(200).send();
  }
}

export { DeleteAddressController };
