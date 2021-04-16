import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const { car_id } = request.params;
    const { specifications_id } = request.body;

    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(car);
  }
}

export { CreateCarSpecificationController };
