import { DreamSerializer } from '@rvoh/dream'
import Guest from '../models/Guest.js'

export const GuestSummarySerializer = (guest: Guest) =>
  DreamSerializer(Guest, guest)
    .attribute('id')

export const GuestSerializer = (guest: Guest) =>
  GuestSummarySerializer(guest)
