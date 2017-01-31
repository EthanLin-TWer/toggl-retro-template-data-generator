export class Report {

   getSummaryData(totalGrand, since, until) {
      let totalDays = this.millisToDay(new Date(until) - new Date(since)) + 1;
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand),
         totalDays,
         grandPercentage: this.percentage(totalGrand / this.millis(totalDays)) 
      }
   }

   percentage(number) {
      return number * 100 + '.00%'
   }

   millis(days) {
      //           hours mins seconds millis
      return days * 24  * 60   * 60   * 1000
   }

   millisToDay(millis) {
      //             seconds mins hours day
      return millis / 1000  / 60 / 60 / 24
   }

   parseMillisToHourMinsFormat(totalGrand) {
      let hours = Math.floor(totalGrand / 1000 / 60 / 60)
      let minutes = Math.floor(totalGrand / 1000 / 60 - hours * 60)
      return `${hours}h ${minutes}min`
   }
}
