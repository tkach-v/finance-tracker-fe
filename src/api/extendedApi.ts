import { BaseApi } from '@/api/_base.api'
import { apiAuth } from '@/api/endpoints/apiAuth'

const extendedApi = BaseApi.injectEndpoints(apiAuth)

export const {} = extendedApi
