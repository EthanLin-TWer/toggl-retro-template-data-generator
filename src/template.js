import Settings from '../settings'

export class Template {
	constructor() {
		this.since = Settings.since
		this.until = Settings.until
	}
	
	generateMarkdown(summary, clients, projects) {
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
${this.generateClientsBriefChart(clients)}

### Detailed projects report

| Client | Projects | Total registration | Hours / day | Percentage |
| :---: | :---: | :---: | :---: | :---: |
${this.generateProjectsBriefChart(projects)}

${this.generateClientsAndProjectsDetailedSection(clients, projects)}


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

	generateClientsBriefChart(clients) {

		return clients.map(client => `| ${client.client} | ${client.time} | ${client.percentage} | ${client.hoursPerDay} |`)
					.reduce((cli, ent) => cli + '\n' + ent)
	}

	generateProjectsBriefChart(projects) {
		return projects.map(client => {
			return client.projects.map((project, index) => {
				let firstColumn = !!index ? '' : client.client
				return `| ${firstColumn} | ${project.project} | ${project.time} | ${project.percentage} | ${project.hoursPerDay} |`
			}).reduce((pro, ject) => pro + '\n' + ject)
		}).reduce((cli, ent) => cli + '\n' + ent)
	}

	generateClientsAndProjectsDetailedSection(clients, projects) {
		return clients.map(client => {
			let title = `## ${client.client} ( ${client.percentage} / ${client.hoursPerDay} )`
			let subgroup = projects.filter(project => project.client === client.client)[0].projects
				.map(project => `**${project.project} ( ${project.percentage} / ${project.hoursPerDay} )**`)
				.reduce((sub, group) => sub + '\n\n' + group)

			return `${title}\n\n${subgroup}`
		}).reduce((cli, ent) => cli + '\n\n' + ent)
	}
}
