import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategory: CreateCategoryUseCase) {}

  public handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createCategory.execute({
        description,
        name,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
