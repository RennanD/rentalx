import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepository: ICarsRepository;
let listCarsUseCase: ListCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = {
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 200,
      description: 'any descript',
      fine_amount: 150,
      license_plate: 'NIU-3920',
    };

    await carsRepository.create(car);

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });
});
