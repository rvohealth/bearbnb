import { PsychicApplicationWebsockets } from '@rvoh/psychic-websockets'
import Redis from 'ioredis'
import AppEnv from './AppEnv'
// import User from '../app/models/User'

export default (wsApp: PsychicApplicationWebsockets) => {
  wsApp.set('websockets', {
    connection: AppEnv.isProduction
      ? new Redis({
          host: AppEnv.string('WS_REDIS_HOST'),
          port: AppEnv.integer('WS_REDIS_PORT'),
          username: AppEnv.string('WS_REDIS_USERNAME', { optional: true }),
          password: AppEnv.string('WS_REDIS_PASSWORD', { optional: true }),
          tls: AppEnv.isProduction ? {} : undefined,
          maxRetriesPerRequest: null,
        })
      : new Redis({
          host: AppEnv.string('WS_REDIS_HOST', { optional: true }) || 'localhost',
          port: AppEnv.integer('WS_REDIS_PORT', { optional: true }) || 6379,
          username: AppEnv.string('WS_REDIS_USERNAME', { optional: true }),
          password: AppEnv.string('WS_REDIS_PASSWORD', { optional: true }),
          tls: AppEnv.isProduction ? {} : undefined,
          maxRetriesPerRequest: null,
        }),
  })

  // ******
  // HOOKS:
  // ******

  wsApp.on('ws:start', io => {
    io.of('/').on('connection', async socket => {
      // below is an example of how you might connect to websockets
      // const token = socket.handshake.auth.token as string
      // const userId = Encrypt.decrypt<string>(token, {
      //   algorithm: 'aes-256-gcm',
      //   key: process.env.APP_ENCRYPTION_KEY!,
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
