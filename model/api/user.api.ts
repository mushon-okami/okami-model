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
	async getUserByPublicKey(publickey: string) {
		try {
			const res = await apiClient.http.get<User>(`${this.getApiUrl()}/publicKey/${publickey}`)
			return res.data
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}

export const userApi = new UserApi({ apiClient })
export default userApi
