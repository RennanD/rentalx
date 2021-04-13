import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { SpecificationsRepositoryInMemori } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemori';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRespository: CarRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemori;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRespository = new CarRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemori();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRespository,
      specificationsRepository
    );
  });

  it('should not be able to add a specification for a nonexistent car', () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'any_id',
        specifications_id: ['any_id_specification'],
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be possible to add a specification for a car', async () => {
    const specification = await specificationsRepository.create({
      name: 'any specification',
      description: 'any description',
    });

    const car = await carsRespository.create({
      name: 'any name',
      brand: 'any brand',
      category_id: 'any category id',
      daily_rate: 100,
      description: 'any description',
      fine_amount: 100,
      license_plate: 'any license plate',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
  });
});
