import adminRoutes from '@conf/routes.admin.js'
import { PsychicRouter } from '@rvoh/psychic'

export default function routes(r: PsychicRouter) {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.namespace('places', r => {
        r.resources('rooms')
      })

      r.resources('places')
    })
  })

  adminRoutes(r)
  // add routes here, perhaps by running `yarn psy g:resource v1/pets Pet name:citext birthdate:date species:enum:pet_species:dog,cat,fish`
}
