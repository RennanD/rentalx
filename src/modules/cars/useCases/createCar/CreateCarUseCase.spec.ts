import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepository: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 100,
      description: 'any description',
      fine_amount: 100,
      license_plate: 'any license plate',
    });
  });

  it('should not be able to create a new car with existent license plate', async () => {
    const carData = {
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 100,
      description: 'any description',
      fine_amount: 100,
      license_plate: 'any license plate',
    };

    await createCarUseCase.execute(carData);

    expect(async () => {
      await createCarUseCase.execute(carData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('the car should be created as available', async () => {
    const car = await createCarUseCase.execute({
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 100,
      description: 'any description',
      fine_amount: 100,
      license_plate: 'any license_plate',
    });

    expect(car.available).toBe(true);
  });
});
