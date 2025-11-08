import { DreamSerializer } from '@rvoh/dream'
import Host from '@models/Host.js'

export const HostSummarySerializer = (host: Host) =>
  DreamSerializer(Host, host)
    .attribute('id')

export const HostSerializer = (host: Host) =>
  HostSummarySerializer(host)
