import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAllAvailableFilters } from '../dtos/IFilterCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(carData: ICreateCarDTO): Promise<Car>;
  findAllAvailable(filters?: IFindAllAvailableFilters): Promise<Car[]>;
}
