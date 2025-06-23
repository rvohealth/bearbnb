import { UpdateableProperties } from '@rvoh/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom.js'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  return await Bathroom.create({
    ...attrs,
  })
}
