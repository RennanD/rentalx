import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategories: ListCategoriesUseCase) {}

  public handle(request: Request, response: Response): Response {
    const categories = this.listCategories.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
