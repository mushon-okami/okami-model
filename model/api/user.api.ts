import { User } from './../interfaces'

import { CRUDApi } from './crud.api'
import { IApiClient } from './interfaces.api'
import configApi from './config.api'
import apiClient from './apiClient'

class UserApi extends CRUDApi<User> {
	readonly entityName = 'User'

	protected getApiUrl(): string {
		return `${configApi.baseUrl}/users`
	}

	constructor({ apiClient }: { apiClient: IApiClient }) {
		super({ apiClient })
	}
}

export const userApi = new UserApi({ apiClient })
export default userApi
