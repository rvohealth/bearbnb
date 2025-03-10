import { Env } from '@rvohealth/dream'

class AppEnvClass extends Env<{
  boolean: 'REQUEST_LOGGING'
  integer: 'BG_JOBS_REDIS_PORT' | 'WS_REDIS_PORT'
  string:
    | 'DOMAIN'
    | 'BG_JOBS_REDIS_HOST'
    | 'BG_JOBS_REDIS_USERNAME'
    | 'BG_JOBS_REDIS_PASSWORD'
    | 'WS_REDIS_HOST'
    | 'WS_REDIS_USERNAME'
    | 'WS_REDIS_PASSWORD'
    | 'CORS_HOSTS'
}> {}

const AppEnv = new AppEnvClass()
export default AppEnv
