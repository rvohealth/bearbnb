import { PsychicRouter } from '@rvoh/psychic'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.namespace('places', r => {
        r.resources('rooms')
      })

      r.resources('places')
    })
  })
}
