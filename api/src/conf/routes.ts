import adminRoutes from '@conf/routes.admin.js'
import { PsychicRouter } from '@rvoh/psychic'

export default function routes(r: PsychicRouter) {
  r.namespace('v1', r => {
    r.namespace('guest', r => {
      r.resources('places', { only: ['index', 'show'] })
      // Alternatively, could have written the routes explicitly:
      // r.get('places', V1GuestPlacesController, 'index')
      // r.get('places/:id', V1GuestPlacesController, 'show')
    })

    r.namespace('host', r => {
      r.resources('localized-texts', { only: ['update', 'destroy'] })

      r.resources('places', r => {
        r.resources('rooms')
      })
    })
  })

  adminRoutes(r)
}
