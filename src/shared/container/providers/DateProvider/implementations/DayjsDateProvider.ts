import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../models/IDateProvider";

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
  
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
