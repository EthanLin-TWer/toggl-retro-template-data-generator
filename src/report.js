export class Report {

   getSummaryData(totalGrand, since, until) {
      return {
         totalGrand: this.parseMillisToHourMinsFormat(totalGrand)
      }
   }

   parseMillisToHourMinsFormat(totalGrand) {
      let hours = Math.round(totalGrand / 1000 / 60 / 60)
      let minutes = totalGrand / 1000 / 60 - hours * 60
      return `${hours}h ${minutes}min`
   }
}
