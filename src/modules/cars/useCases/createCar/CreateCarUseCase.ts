import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  public async execute({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const existentCar = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (existentCar) {
      throw new AppError('Car already registered.');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export { CreateCarUseCase };
