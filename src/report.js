export class Report {

  constructor(timeService, weekdayService) {
    this.timeService = timeService
    this.weekdayService = weekdayService
  }

  getProjectsData(reports, since, until) {
    return reports.map(client => {
      return {
        client: client.title.client,
        time: this.timeService.millisToHoursAndMinsFormat(client.time),
        projects: client.items.map(project => {
          let millisPerDay = project.time / this.timeService.daysBetween(since,until)
          return {
            project: project.title.project,
            time: this.timeService.millisToHoursAndMinsFormat(project.time),
            hoursPerDay: this.timeService.millisToHoursAndMinsFormat(millisPerDay), 
            percentage: `${this.percentage(project.time / client.time)}%`
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
    let grandPercentage = this.percentage(totalGrand / this.timeService.toMillis(totalDays))
    let weekdays = this.weekdayService.weekdaysBetween(since, until)
    let holidays = this.weekdayService.holidays()
    let leaves = this.weekdayService.leaves()
    let otherAbsent = this.weekdayService.otherAbsent()
    return {
      totalGrand: this.timeService.millisToHoursAndMinsFormat(totalGrand),
      totalDays: this.timeService.daysBetween(since, until),
      weekdays, holidays, leaves,
      actualWeekdays: weekdays - (holidays.length + leaves.length + otherAbsent.length), 
      grandPercentage: `${grandPercentage}%`,
      grandHoursPerDay: this.timeService.millisToHoursAndMinsFormat(totalGrand / totalDays)
    }
  }

  percentage(number) {
    return (number * 100).toFixed(2)
  }
}
