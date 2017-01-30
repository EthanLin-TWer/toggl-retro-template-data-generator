export class Report {

	getProjectsData(reports, since, until) {
		return reports.map(report => {
			let client = report.title.client
			let clientTime = report.time

			let projects = report.items.map(project => {
				let projectTime = project.time
				let clientPercentage = projectTime / clientTime
				let clientHours = clientTime / this.getTotalMillis(until, since) * 24
				return {
					project: project.title.project,
					time: this.toHours(projectTime),
					percentage: this.percentage(clientPercentage) + '%',
					hoursPerDay: this.formatHours(clientPercentage * clientHours)
				}
			})

			return {
				client, 
				time: this.toHours(clientTime), 
				projects
			}
		})
	}

	getClientData(reports, since, until) {
		
		return reports.map(report => { 
			let { title, time } = report
			let percentage = time / this.getTotalMillis(until, since)
			return {
				client: title.client, 
				time: this.toHours(time), 
				percentage: this.percentage(percentage) + '%',
				hoursPerDay: this.formatHours(percentage * 24)
			}
		})
	}

	getSummaryData(totalGrand, since, until) {
		let grandPercentage = totalGrand / this.getTotalMillis(until, since)
		return {
			totalGrand: this.toHours(totalGrand), 
			totalDays: this.totalDays(until, since),
			grandPercentage: this.percentage(grandPercentage) + '%',
			grandHoursPerDay: this.formatHours(grandPercentage * 24)
		}
	}

	getTotalMillis(until, since) {
		return this.millisPerDay() * this.totalDays(until, since)
	}

	totalDays(until, since) {
		return (new Date(until) - new Date(since)) / this.millisPerDay()
	}

   millisPerDay() {
		return 60 * 60 * 24 * 1000
	}

	percentage(number) {
		if (number <= 0 || number > 1) return number;
		return (number * 100).toFixed(2)
	}

	formatHours(hours) {
		let hour = Math.floor(hours)
		let minutes = Math.ceil((hours - hour) * 60)

		return `${hour}h ${minutes}min`
	}

	toHours(millis) {
		let hours = millis / 1000 / 60 / 60
		return this.formatHours(hours)
	}
}
