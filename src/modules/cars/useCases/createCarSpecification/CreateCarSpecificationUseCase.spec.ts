import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRespository: CarRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRespository = new CarRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRespository
    );
  });

  it('should not be able to add a specification for a nonexistent car', () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'any_id',
        specifications_id: ['any_id_specification'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  // it('should be possible to add a specification for a car', async () => {
  //   await createCarSpecificationUseCase.execute({
  //     car_id: 'any_id',
  //     specifications_id: ['any_id_specification'],
  //   });
  // });
});
