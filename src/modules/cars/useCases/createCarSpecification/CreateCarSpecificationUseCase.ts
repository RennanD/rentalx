import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    private carsRespository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}
  public async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRespository.findById(car_id);

    if (!car) {
      throw new AppError("This does'nt exists.");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    await this.carsRespository.create(car);
  }
}

export { CreateCarSpecificationUseCase };
