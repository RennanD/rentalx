import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { accessControll } from '../middlewares/accessControll';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const categoriesRouter = Router();

categoriesRouter.get('/', listCategoriesController.handle);

// Auth admin routes
categoriesRouter.use(ensureAuthenticated);
categoriesRouter.use(accessControll);

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRouter };
