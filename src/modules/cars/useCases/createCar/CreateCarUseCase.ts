import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRespository } from '@modules/cars/repositories/ICarsRespository';
import { AppError } from '@shared/errors/AppError';

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRespository')
    private carsRepository: ICarsRespository
  ) {}
  public async execute({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<void> {
    const existentCar = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (existentCar) {
      throw new AppError('Car already registered.');
    }

    await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });
  }
}

export { CreateCarUseCase };
