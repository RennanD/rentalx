import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  public async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
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
  }
}

export { CreateRentalUseCase };
