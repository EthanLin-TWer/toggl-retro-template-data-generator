import Settings from '../settings'

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
          let effectiveDays = this.isWeekdayProject(project.title.project) ? 
            this.weekdayService.actualWeekdays(since, until) : 
            this.timeService.daysBetween(since, until) 
            - this.weekdayService.otherAbsent().length
          let millisPerDay = project.time / effectiveDays
          
          return {
            project: project.title.project,
            time: this.timeService.millisToHoursAndMinsFormat(project.time),
            effectiveDays,
            hoursPerDay: this.timeService.millisToHoursAndMinsFormat(millisPerDay), 
            percentage: `${this.percentage(project.time / client.time)}%`
          }
        })
      }
    })
  }
  
  getClientData(reports, since, until) {
    
    return reports.map(client => {
      let effectiveDays = this.isWeekdayClient(client.title.client) ? 
        this.weekdayService.actualWeekdays(since, until) 
        : this.timeService.daysBetween(since, until)
          - this.weekdayService.otherAbsent().length
      
      let percentage = client.time / this.timeService.totalMillis(since, until)
      let millisPerDay = client.time / effectiveDays
      return {
        client: client.title.client,
        time: this.timeService.millisToHoursAndMinsFormat(client.time),
        effectiveDays,
        percentage: `${this.percentage(percentage)}%`,
        hoursPerDay: this.timeService.millisToHoursAndMinsFormat(millisPerDay)
      }
    })  
  }
  
  getSummaryData(totalGrand, since, until) {
    let totalDays = this.timeService.daysBetween(since, until)
    let grandPercentage = this.percentage(totalGrand / this.timeService.toMillis(totalDays))
    let holidays = this.weekdayService.holidays()
    let leaves = this.weekdayService.leaves()
    
    return {
      totalGrand: this.timeService.millisToHoursAndMinsFormat(totalGrand),
      totalDays: totalDays - this.weekdayService.otherAbsent().length,
      holidays, leaves,
      actualWeekdays: this.weekdayService.actualWeekdays(since, until), 
      grandPercentage: `${grandPercentage}%`,
      grandHoursPerDay: this.timeService.millisToHoursAndMinsFormat(totalGrand / totalDays)
    }
  }
  
  isWeekdayClient(client) {
    if (!client) return false
    
    let weekdayClients = Settings.weekdayClients
    return weekdayClients.some(registered => client.startsWith(registered))
  }
  
  isWeekdayProject(project) {
    if (!project) return false
    
    let weekdayProjects = Settings.weekdayProjects
    return weekdayProjects.some(registered => project.startsWith(registered))
  }

  percentage(number) {
    return (number * 100).toFixed(2)
  }
}
