import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

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
    const carAvailable = this.rentalsRepository.findOpenRentalByCar(car_id);
  }
}

export { CreateRentalUseCase };
