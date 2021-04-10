import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  public async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable();

    return cars;
  }
}

export { ListCarsUseCase };
