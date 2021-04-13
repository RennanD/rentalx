import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carsRespository: ICarsRepository) {}
  public async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRespository.findById(car_id);

    if (!car) {
      throw new AppError("This does'nt exists.");
    }
  }
}

export { CreateCarSpecificationUseCase };
