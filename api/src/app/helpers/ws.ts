import { Ws } from '@rvohealth/psychic-websockets'

export const WS_ROUTES = ['/ops/connection-success'] as const

const ws = new Ws(WS_ROUTES)

export default ws
