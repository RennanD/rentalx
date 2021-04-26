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

  it('should not be able to create a new rental with unavaliable car', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: new Date(2021, 5, 28),
    };

    await rentalsInMemoryRepository.create(rentalData);

    expect(async () => {
      await createRentalUseCase.execute(rentalData);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('shoul not be able to create a new rental if there is another rental open for the same user', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: new Date(2021, 5, 28),
    };

    await rentalsInMemoryRepository.create(rentalData);
    expect(async () => {
      await createRentalUseCase.execute({
        ...rentalData,
        car_id: 'other_car_id',
      });
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should not be able to create a rental that is less than 24 hours long', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: new Date(2021, 3, 26),
    };

    expect(async () => {
      await createRentalUseCase.execute(rentalData);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be able to create a new rental', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: new Date(2021, 5, 28),
    };

    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
});
