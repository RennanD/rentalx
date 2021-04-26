import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsInMemoryRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  public async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
      end_date: null,
    });

    this.rentals.push(rental);

    return rental;
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }
  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  public async save(rental: Rental): Promise<void> {
    const rentals = this.rentals.map((rentalItem) => {
      if (rentalItem.id === rental.id) {
        return rental;
      }
      return rentalItem;
    });

    this.rentals = rentals;
  }
}

export { RentalsInMemoryRepository };
