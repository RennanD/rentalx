import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFile {
  filename: string;
}

class UploadCarImageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImage = container.resolve(UploadCarImageUseCase);

    const { car_id } = request.params;

    const images = request.files as IFile[];

    const filenames = images.map((file) => file.filename);

    await uploadCarImage.execute({
      car_id,
      images_nane: filenames,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
