export class Time {

   daysToMillis(days) {
      //           hours mins seconds millis
      return days * 24  * 60   * 60   * 1000
   }

   daysBetween(start, end) {
      let millisBetween = new Date(end) - new Date(start);
      return this.millisToDay(millisBetween) + 1
   }
   
   millisToDay(millis) {
      //             seconds mins hours day
      return millis / 1000  / 60 / 60 / 24
   }

}