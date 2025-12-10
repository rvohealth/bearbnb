import AppEnv from '@conf/AppEnv.js'
import { PsychicApp } from '@rvoh/psychic'
import { PsychicAppWebsockets } from '@rvoh/psychic-websockets'
import { Redis } from 'ioredis'
// import User from '@models/User.js'

export default (psy: PsychicApp) => {
  psy.plugin(async () => {
    await PsychicAppWebsockets.init(psy, initializeWebsockets)
  })
}

function initializeWebsockets(wsApp: PsychicAppWebsockets) {
  wsApp.set('websockets', {
    connection: AppEnv.isProduction
      ? new Redis({
          host: AppEnv.string('WS_REDIS_HOST'),
          port: AppEnv.integer('WS_REDIS_PORT', { optional: true }) || 6379,
          username: AppEnv.string('WS_REDIS_USERNAME'),
          password: AppEnv.string('WS_REDIS_PASSWORD'),
          tls: {},
          maxRetriesPerRequest: null,
        })
      : new Redis({
          host: AppEnv.string('WS_REDIS_HOST', { optional: true }) || 'localhost',
          port: AppEnv.integer('WS_REDIS_PORT', { optional: true }) || 6379,
          username: AppEnv.string('WS_REDIS_USERNAME', { optional: true }),
          password: AppEnv.string('WS_REDIS_PASSWORD', { optional: true }),
          // tls:  {},
          maxRetriesPerRequest: null,
        }),
  })

  // ******
  // HOOKS:
  // ******

  wsApp.on('ws:start', io => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    io.of('/').on('connection', async socket => {
      // below is an example of how you might connect to websockets
      // const token = socket.handshake.auth.token as string
      // const userId = Encrypt.decrypt<string>(token, {
      //   algorithm: 'aes-256-gcm',
      //   key: AppEnv.string('APP_ENCRYPTION_KEY'),
      // })!
      // const user = await User.find(userId)
      //
      // if (user) {
      //   // this automatically fires the /ops/connection-success message
      //   await Ws.register(socket, user.id)
      // }
    })
  })

  wsApp.on('ws:connect', () => {
    // do something upon websocket connection being established
  })
}
