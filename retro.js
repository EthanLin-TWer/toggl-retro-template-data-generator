import TogglClient from 'toggl-api'
import Settings from './settings'

const apiToken = Settings.token
let toggl = new TogglClient({ apiToken })

toggl.getClients((error, clients) => {
  console.log('----clients----')
  console.log(clients)

  clients.forEach(client => {
    toggl.getClientProjects(client.id, true, (error, project) => {
      console.log('----project----')
      console.log(project)
    })
  })
})
