export class Report {

   constructor(time) {
      this.time = time
   }

   getSummaryData(totalGrand, since, until) {
      let totalDays = this.time.daysBetween(since, until)
      return {
         totalGrand: this.time.millisToHoursAndMinsFormat(totalGrand),
         totalDays: this.time.daysBetween(since, until),
         grandPercentage: this.percentage(totalGrand / this.time.toMillis(totalDays))
      }
   }

   percentage(number) {
      return `${(number * 100).toFixed(2)}%`
   }
}
