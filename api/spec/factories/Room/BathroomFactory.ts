import Bathroom from '@models/Room/Bathroom.js'
import { UpdateableProperties } from '@rvoh/dream'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  return await Bathroom.create({
    bathOrShowerStyle: 'bath',
    ...attrs,
  })
}
