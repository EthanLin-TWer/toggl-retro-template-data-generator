export class Report {

   getSummaryData(totalGrand, since, until) {
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand),
         totalDays: this.millisToDay(new Date(until) - new Date(since)) + 1,
         grandPercentage: '50.00%'
      }
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
