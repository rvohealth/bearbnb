import { PsychicRouter } from '@rvohealth/psychic'
import V1HostPlacesController from '../app/controllers/V1/Host/PlacesController'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.resources('localized-texts')
    })

    r.namespace('guest', r => {
      r.resources('stays')
    })

    r.namespace('host', r => {
      r.resources('places', r => {
        r.post('undelete', V1HostPlacesController, 'undestroy')
        r.resources('rooms')
      })
    })
  })
}
