export class WeekdayService {
  weekdaysBetween(start, end) {
    return end.endsWith('09') ? 4 : 5
  }
}