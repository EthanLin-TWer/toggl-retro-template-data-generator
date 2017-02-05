export class Report {

  constructor(timeService) {
    this.timeService = timeService
  }

  getClientData(reports, since, until) {
    return reports.map(report => {
      
    })  
  }
  
  getSummaryData(totalGrand, since, until) {
    let totalDays = this.timeService.daysBetween(since, until)
    let grandPercentage = this.percentage(totalGrand / this.timeService.toMillis(totalDays));
    return {
      totalGrand: this.timeService.millisToHoursAndMinsFormat(totalGrand),
      totalDays: this.timeService.daysBetween(since, until),
      grandPercentage: `${grandPercentage}%`,
      grandHoursPerDay: this.timeService.millisToHoursAndMinsFormat(totalGrand / totalDays)
    }
  }

  percentage(number) {
    return (number * 100).toFixed(2)
  }
}
