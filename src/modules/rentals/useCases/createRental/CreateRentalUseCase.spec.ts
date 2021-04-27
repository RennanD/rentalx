import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

import { RentalsInMemoryRepository } from '../../repositories/in-memory/RentalsInMemoryRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsInMemoryRepository: RentalsInMemoryRepository;
let dateProvider: DayjsDateProvider;

describe('Creat Rental', () => {
  beforeEach(() => {
    rentalsInMemoryRepository = new RentalsInMemoryRepository();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      dateProvider,
      rentalsInMemoryRepository
    );
  });

  it('should not be able to create a new rental with unavaliable car', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: dateProvider.addDays(1),
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
      expected_return_date: dateProvider.addDays(1),
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
      expected_return_date: dateProvider.getDateNow(),
    };

    expect(async () => {
      await createRentalUseCase.execute(rentalData);
    }).rejects.toBeInstanceOf(BadRequestError);
  });

  it('should be able to create a new rental', async () => {
    const rentalData = {
      car_id: 'any_id',
      user_id: 'any_user',
      expected_return_date: dateProvider.addDays(2),
    };

    const rental = await createRentalUseCase.execute(rentalData);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
});
