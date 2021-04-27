import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private dateProvider: IDateProvider,
    private rentalsRepository: IRentalsRepository
  ) {}

  public async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new BadRequestError('This car is unavaliable');
    }

    const openRentalForUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (openRentalForUser) {
      throw new BadRequestError('Have a another rental open for this user');
    }

    const dateNow = this.dateProvider.getDateNow();

    const compareRentalDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareRentalDate < 24) {
      throw new BadRequestError(
        'The rental must have a minimum duration of 24 hours'
      );
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
