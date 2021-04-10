import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  public async execute({ name, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable({ name, brand });

    return cars;
  }
}

export { ListCarsUseCase };
