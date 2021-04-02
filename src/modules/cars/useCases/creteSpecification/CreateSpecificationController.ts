import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  public handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const createSpecification = container.resolve(CreateSpecificationUseCase);

    try {
      createSpecification.execute({
        description,
        name,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
