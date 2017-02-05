export class TimeService {

  constructor() {
    this.yyyymmddReg = /\d{4}-\d{2}-\d{2}/
    this.MILLIS_OF_ONE_DAY = 24 * 60 * 60 * 1000
  }

  toMillis(days) {
    //           hours mins seconds millis
    return Math.round(days * this.MILLIS_OF_ONE_DAY)
  }

  millisToHoursAndMinsFormat(millis) {
    let hours = Math.floor(millis / 1000 / 60 / 60)
    let minutes = Math.floor(millis / 1000 / 60 - hours * 60)

    return `${hours}h ${minutes}min`
  }

  daysBetween(start, end) {
    if (start.trim().length === 0) throw new Error('start date cannot be empty')
    if (end.trim().length === 0) throw new Error('end date cannot be empty')
    if (!this.yyyymmddReg.test(start)) throw new Error('start date should be in yyyy-mm-dd format')
    if (!this.yyyymmddReg.test(end)) throw new Error('end date should be in yyyy-mm-dd format')
    if (this.totalMillis(start, end) < this.millisOfOneDay()) throw new Error('start date can\'t be later than end date')

    return this.totalMillis(start, end) / this.millisOfOneDay()
  }
  
  totalMillis(start, end) {
    return new Date(end) - new Date(start) + this.millisOfOneDay()
  }
  
  millisToDay(millis) {
    //             seconds mins hours day
    return millis / this.MILLIS_OF_ONE_DAY
  }

  millisOfOneDay() {
    return this.MILLIS_OF_ONE_DAY
  }
}
