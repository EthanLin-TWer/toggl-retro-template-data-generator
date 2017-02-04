export class Report {

  constructor(timeService) {
    this.timeService = timeService
  }

  getSummaryData(totalGrand, since, until) {
    let totalDays = this.timeService.daysBetween(since, until)
    return {
      totalGrand: this.timeService.millisToHoursAndMinsFormat(totalGrand),
      totalDays: this.timeService.daysBetween(since, until),
      grandPercentage: `${this.percentage(totalGrand / this.timeService.toMillis(totalDays))}%`,
      grandHoursPerDay: this.timeService.millisToHoursAndMinsFormat(totalGrand / totalDays)
    }
  }

  percentage(number) {
    return (number * 100).toFixed(2)
  }
}
