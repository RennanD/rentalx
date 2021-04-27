import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const endDateFormatted = this.convertToUTC(end_date);
    const startDateFormatted = this.convertToUTC(start_date);
    const compareHours = dayjs(endDateFormatted).diff(
      startDateFormatted,
      'hours'
    );

    return compareHours;
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  getDateNow(): Date {
    return dayjs().toDate();
  }

  addDays(number_of_days: number): Date {
    return dayjs().add(number_of_days, 'day').toDate();
  }
}

export { DayjsDateProvider };
