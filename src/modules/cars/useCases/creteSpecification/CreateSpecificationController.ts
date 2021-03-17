import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecification: CreateSpecificationUseCase) {}

  public handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      this.createSpecification.execute({
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
