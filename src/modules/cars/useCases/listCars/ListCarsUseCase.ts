import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  public async execute(name?: string): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable({ name });

    return cars;
  }
}

export { ListCarsUseCase };
