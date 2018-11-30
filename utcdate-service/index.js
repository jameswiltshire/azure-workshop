const Hapi = require('hapi')
const server = new Hapi.Server()
const moment = require('moment')
server.connection({port: 3001})

server.route({
  method: 'GET',
  path: '/{timestamp}/utcdate',
  handler: (request, reply) => {
    let date = moment.unix(request.params.timestamp).utc().toISOString().substring(0, 19)
    reply({date: date})
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('isodate-service started on port 3001')
})

process.on('SIGTERM', () => {
  server.stop()
})

process.on('SIGKILL', () => {
  server.stop()
})
