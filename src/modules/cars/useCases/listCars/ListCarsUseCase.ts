import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  public async execute({ name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable({ name });

    return cars;
  }
}

export { ListCarsUseCase };
