import '../conf/loadEnv.js'

import AppEnv from '../conf/AppEnv.js'

// eslint-disable-next-line @typescript-eslint/require-await
export default async function seed() {
  if (AppEnv.isTest) return
  // seed your db here
}
