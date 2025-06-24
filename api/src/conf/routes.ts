import { PsychicRouter } from '@rvoh/psychic'
import V1GuestPlacesController from '../app/controllers/V1/Guest/PlacesController.js'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('guest', r => {
      r.get('places', V1GuestPlacesController, 'index')
      r.get('places/:id', V1GuestPlacesController, 'show')
    })

    r.namespace('host', r => {
      r.resources('localized-texts', { only: ['update', 'destroy'] })

      r.resources('places', r => {
        r.resources('rooms')
      })
    })
  })
}
