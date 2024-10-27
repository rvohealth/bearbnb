import { PsychicRouter } from '@rvohealth/psychic'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.resources('rooms')
    })

    r.namespace('guest', r => {
      r.resources('stays')
    })

    r.namespace('host', r => {
      r.resources('places')
    })
  })

}
