export class Report {

   getSummaryData(totalGrand, since, until) {
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand)
      }
   }

   parseMillisToHourMinsFormat(totalGrand) {
      let hours = totalGrand / 1000 / 60 / 60;
      return `${hours}h 0min`
   }
}
