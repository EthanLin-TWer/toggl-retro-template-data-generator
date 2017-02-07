export class Report {

  constructor(timeService) {
    this.timeService = timeService
  }

  getProjectsData(reports, since, until) {
    return reports.map(client => {
      return {
        client: client.title.client,
        time: this.timeService.millisToHoursAndMinsFormat(client.time),
        projects: client.items.map(project => {
          return {
            project: project.title.project,
            time: this.timeService.millisToHoursAndMinsFormat(project.time)
          }
        })
      }
    })
  }
  
  getClientData(reports, since, until) {
    return reports.map(report => {
      let percentage = report.time / this.timeService.totalMillis(since, until)
      let millisPerDay = report.time / this.timeService.daysBetween(since, until)
      return {
        client: report.title.client,
        time: this.timeService.millisToHoursAndMinsFormat(report.time),
        percentage: `${this.percentage(percentage)}%`,
        hoursPerDay: this.timeService.millisToHoursAndMinsFormat(millisPerDay)
      }
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
