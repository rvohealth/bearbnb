import { PsychicRouter } from '@rvohealth/psychic'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.resources('localized-texts')

      r.namespace('places', r => {
        r.resources('rooms')
      })

      r.resources('places')
    })
  })

}
