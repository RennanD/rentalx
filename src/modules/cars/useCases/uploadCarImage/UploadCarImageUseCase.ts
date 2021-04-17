import { inject, injectable } from 'tsyringe';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

interface IRequest {
  car_id: string;
  images_nane: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository
  ) {}
  public async execute({ car_id, images_nane }: IRequest): Promise<void> {
    images_nane.forEach(async (image) => {
      await this.carsImageRepository.create({
        car_id,
        image_name: image,
      });
    });
  }
}

export { UploadCarImageUseCase };
