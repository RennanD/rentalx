import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(carData: ICreateCarDTO): Promise<Car>;
  findAllAvailable(): Promise<Car[]>;
}
