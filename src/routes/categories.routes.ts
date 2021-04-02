import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

const categoriesRouter = Router();

categoriesRouter.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRouter };
