import { ICreateCarImageDTO } from '../dtos/ICreateCarImageDTO';
import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarsImageRepository {
  create(carImageData: ICreateCarImageDTO): Promise<CarImage>;
}
