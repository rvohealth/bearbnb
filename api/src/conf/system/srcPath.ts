import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

declare const importMeta: unique symbol
let finalDirname: string

if (typeof importMeta !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const __filename = fileURLToPath(import.meta.url)
  finalDirname = dirname(__filename)
} else {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    finalDirname = __dirname
  } catch {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const __filename = fileURLToPath(import.meta.url)
    finalDirname = dirname(__filename)
  }
}

// this function ultimately needs to point to the root folder that
// all of your code lives in. In a default psychic application, this
// will already be correctly set for you, but if you have customized
// the path to your psychic conf folder, this could be incorrect.
// for example, if this file is in
//   "my-app/src/api/conf/system/srcPath.ts",
// then you will need to add an additional updir, like so:
//   const pathToSrc = join(finalDirname, '..', '..', '..')
export default function srcPath(...paths: string[]) {
  const pathToSrc = join(finalDirname, '..', '..')
  return join(pathToSrc, ...paths)
}
