import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

type QueryResult = {
  name?: string;
  brand?: string;
  category_id?: string;
};

class ListAvaliableCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query as QueryResult;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      name,
      brand,
      category_id,
    });

    return response.json(cars);
  }
}

export { ListAvaliableCarsController };
