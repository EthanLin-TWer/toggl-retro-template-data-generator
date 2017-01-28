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
					time: projectTime, 
					percentage: clientPercentage,
					hoursPerday: clientPercentage * clientHours
				}
			})

			return {
				client, 
				time: clientTime, 
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
				time, percentage,
				hoursPerDay: percentage * 24
			}
		})
	}

	getSummaryData(totalGrand, since, until) {
		let grandPercentage = totalGrand / this.getTotalMillis(until, since)
		return {
			totalGrand, 
			totalDays: this.totalDays(until, since), 
			grandPercentage,
			grandHoursPerDay: grandPercentage * 24
		}
	}

	getTotalMillis(until, since) {
		return this.millisPerDay() * this.totalDays(until, since)
	}

	totalDays(until, since) {
		return (new Date(until) - new Date(since)) / this.millisPerDay()
	}

	getHours(until, since) {
		return this.totalDays(until, since) * 24 
	}

	millisPerDay() {
		return 60 * 60 * 24 * 1000
	}

}
