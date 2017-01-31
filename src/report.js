import { Time } from './TimeUtils'

export class Report {

   constructor() {
      this.time = new Time()
   }

   getSummaryData(totalGrand, since, until) {
      let totalDays = this.time.millisToDay(new Date(until) - new Date(since)) + 1;
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand),
         totalDays,
         grandPercentage: this.percentage(totalGrand / this.time.daysToMillis(totalDays))
      }
   }

   percentage(number) {
      return number * 100 + '.00%'
   }

   parseMillisToHourMinsFormat(totalGrand) {
      let hours = Math.floor(totalGrand / 1000 / 60 / 60)
      let minutes = Math.floor(totalGrand / 1000 / 60 - hours * 60)
      return `${hours}h ${minutes}min`
   }
}
