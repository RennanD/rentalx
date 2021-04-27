export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  getDateNow(): Date;
  addDays(number_of_days: number): Date;
}
