export class Report {

   constructor(time) {
      this.time = time
   }

   getSummaryData(totalGrand, since, until) {
      let totalDays = this.time.daysBetween(since, until)
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand),
         totalDays,
         grandPercentage: this.percentage(totalGrand / this.time.daysToMillis(totalDays))
      }
   }

   percentage(number) {
      return `${(number * 100).toFixed(2)}%`
   }

   parseMillisToHourMinsFormat(totalGrand) {
      let hours = Math.floor(totalGrand / 1000 / 60 / 60)
      let minutes = Math.floor(totalGrand / 1000 / 60 - hours * 60)
      return `${hours}h ${minutes}min`
   }
}
