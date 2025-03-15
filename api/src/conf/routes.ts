import { PsychicRouter } from '@rvoh/psychic'

export default (r: PsychicRouter) => {
  r.namespace('v1', r => {
    r.namespace('host', r => {
      r.resources('localized-texts')

      r.resources('places', r => {
        r.resources('rooms')
      })
    })
  })

  // add routes here, perhaps by running `yarn psy g:resource v1/pets Pet name:citext birthdate:date species:enum:pet_species:dog,cat,fish`
}
