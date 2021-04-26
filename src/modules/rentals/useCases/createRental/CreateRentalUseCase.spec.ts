import { BadRequestError } from '@shared/errors/BadRequestError';

import { RentalsInMemoryRepository } from '../../repositories/in-memory/RentalsInMemoryRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsInMemoryRepository: RentalsInMemoryRepository;

describe('Creat Rental', () => {
  beforeEach(() => {
    rentalsInMemoryRepository = new RentalsInMemoryRepository();
    createRentalUseCase = new CreateRentalUseCase(rentalsInMemoryRepository);
  });

  it('should not be able to create a new with unavaliable car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'any_id',
        user_id: 'any_user',
        expected_return_date: new Date(2021, 5, 27),
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  // it('should be able to create a new rental', async () => {
  //   await createRentalUseCase.execute();
  // });
});
