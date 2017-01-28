import Settings from '../settings'

export class Template {
	constructor() {
		this.since = Settings.since
		this.until = Settings.until
	}
	generateMarkdown(summary, clients, projects) {
		console.log(clients)
		return this.populateTemplate(summary, clients, projects)
	}

	populateTemplate(summary, clients, projects) {
		return `
## Overview

https://toggl.com/app/reports/summary/1663862/from/${this.since}/to/${this.until}/billable/both

| 总记时<br/>Total grand | 总工作日<br/>Total days | 记录率<br/>Grand percentage | 每天记录时<br/>Grand hours / day|
| :---: | :---: | :---: | :---: |
| ${summary.totalGrand} | ${summary.totalDays} | ${summary.grandPercentage} | ${summary.grandHoursPerDay} | 

## Actions from last retro

* [ ] To copy from last retro

## Dive into analytics

https://toggl.com/app/reports/summary/1663862/from/${this.since}/to/${this.until}/billable/both

展开几个主项后截图即可。

### Clients report 

| Client | Total registration | Percentage | Hours/Day |
| :---: | :---: | :---: | :---: |
${this.generateClientsTemplate(clients)}

### Detailed projects report

| Client | Projects | Total registration | Hours / day | Percentage |
| :---: | :---: | :---: | :---: | :---: |
${this.generateProjectsTemplate(projects)}

## Well

*

## Less well

* 

## Actions 

| General Idea | Retroed from ... | Description | Acceptance Criteria |
| :---: | :---: | :--- | :--- |
| - | - | - | <ul></ul><ul><li>[ ] </li></ul> |

## Thoughts 💡

💡

💡

## References 

		`
	}

	generateClientsTemplate(clients) {

		return clients.map(client => {
			return `| ${client.client} | ${client.time} | ${client.percentage} | ${client.hoursPerDay} |`
		}).reduce((cli, ent) => cli + '\n' + ent)
	}

	generateProjectsTemplate(projects) {
		return '| | | | | |'
	}
}
