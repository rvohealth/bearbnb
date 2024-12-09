import { PsychicRouter } from '@rvohealth/psychic'
import V1HostPlacesController from '../app/controllers/V1/Host/PlacesController'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.resources('localized-texts')

      r.namespace('places', r => {
        r.resources('rooms')
      })

      r.resources('places', r => {
        r.post('undestroy', V1HostPlacesController, 'undestroy')
      })
    })
  })
}
