import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserAddressUseCase } from './list-user-address';

class ListUserAddressControler {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listUserAddressUseCase = container.resolve(ListUserAddressUseCase);

    const address = await listUserAddressUseCase.execute(user_id);

    return response.status(200).json(address);
  }
}

export { ListUserAddressControler };
