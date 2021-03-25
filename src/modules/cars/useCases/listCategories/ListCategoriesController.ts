import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategories: ListCategoriesUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategories.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
