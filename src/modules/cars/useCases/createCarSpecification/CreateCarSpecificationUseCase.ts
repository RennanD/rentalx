import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { BadRequestError } from '@shared/errors/BadRequestError';

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
      throw new BadRequestError("This does'nt exists.");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    await this.carsRespository.save(car);
  }
}

export { CreateCarSpecificationUseCase };
