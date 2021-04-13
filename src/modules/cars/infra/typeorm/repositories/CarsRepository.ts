import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAllAvailableFilters } from '@modules/cars/dtos/IFilterCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }

  public async findAllAvailable({
    name,
    brand,
    category_id,
  }: IFindAllAvailableFilters): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true });

    if (name) {
      carsQuery.andWhere("car.name ILIKE '%' || :name || '%'", { name });
    }

    if (brand) {
      carsQuery.andWhere("car.brand ILIKE '%' || :brand || '%'", { brand });
    }

    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id ', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  public async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  public async save(car: Car): Promise<Car> {
    await this.repository.save(car);

    return car;
  }
}

export { CarsRepository };
