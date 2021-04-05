import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createCategory = container.resolve(CreateCategoryUseCase);
    await createCategory.execute({
      description,
      name,
    });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
