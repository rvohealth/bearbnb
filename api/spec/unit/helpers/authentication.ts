import AppEnv from '@conf/AppEnv.js'
import User from '@models/User.js'
import { Dream } from '@rvoh/dream'
import { Encrypt } from '@rvoh/dream/utils'
import { PsychicServer } from '@rvoh/psychic'
import { OpenapiRequestBody, OpenapiRequestQuery, OpenapiSpecRequest } from '@rvoh/psychic-spec-helpers'
import { paths as OpenapiPaths } from '@src/types/openapi/spec.openapi.js'

export type SpecRequestType = Awaited<ReturnType<typeof session>>

export type RequestBody<HttpMethod extends 'get' | 'post' | 'patch' | 'delete', Uri> = OpenapiRequestBody<
  OpenapiPaths,
  HttpMethod,
  Uri
>

export type RequestQuery<HttpMethod extends 'get' | 'post' | 'patch' | 'delete', Uri> = OpenapiRequestQuery<
  OpenapiPaths,
  HttpMethod,
  Uri
>

// eslint-disable-next-line @typescript-eslint/require-await
async function userJwt(user: User): Promise<string> {
  /**
   * The current authentication scheme is only for early development.
   * Replace with a production grade authentication scheme.
   */
  return Encrypt.encrypt(JSON.stringify({ userId: user.primaryKeyValue() }), {
    algorithm: 'aes-256-gcm',
    key: AppEnv.string('APP_ENCRYPTION_KEY'),
  })
}

// eslint-disable-next-line @typescript-eslint/require-await
async function adminUserJwt(adminUser: Dream): Promise<string> {
  /**
   * The current authentication scheme is only for early development.
   * Replace with a production grade authentication scheme.
   */
  return Encrypt.encrypt(JSON.stringify({ adminUser: adminUser.primaryKeyValue() }), {
    algorithm: 'aes-256-gcm',
    key: AppEnv.string('APP_ENCRYPTION_KEY'),
  })
}

export async function session(user: Dream) {
  const request = new OpenapiSpecRequest<OpenapiPaths>()
  await request.init(PsychicServer)

  /** if using JWT authentication*/
  const bearerToken = user instanceof User ? await userJwt(user) : await adminUserJwt(user)
  return request.setDefaultHeaders({ Authorization: `Bearer ${bearerToken}` })

  /** if using password authentication*/
  // const sessionPath = user instanceof User ? '/session' : '/admin/session'
  // return await request.session('post', sessionPath, 204, {
  //   data: {
  //     email: user.email,
  //     password: 'spec-user-password',
  //   },
  // })
}
