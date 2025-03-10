import { Env } from '@rvohealth/dream'

const EnvInternal = new Env<{
  string:
    | 'APP_ENCRYPTION_KEY'
    | 'BG_JOBS_REDIS_HOST'
    | 'BG_JOBS_REDIS_PASSWORD'
    | 'BG_JOBS_REDIS_USERNAME'
    | 'CLIENT_HOST'
    | 'PSYCHIC_SSL_CERT_PATH'
    | 'PSYCHIC_SSL_KEY_PATH'
    | 'SSL_CERT_PATH'
    | 'SSL_KEY_PATH'
    | 'WS_REDIS_HOST'
    | 'WS_REDIS_PASSWORD'
    | 'WS_REDIS_USERNAME'
  boolean: 'DEBUG' | 'REQUEST_LOGGING'
  integer: 'BG_JOBS_REDIS_PORT' | 'WS_REDIS_PORT'
}>()

export default EnvInternal
