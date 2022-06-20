import { Account, AuthLoginOrRegister, AuthVerify, AuthVerifyResponse, User } from './../interfaces'
import apiClient from './apiClient'
import configApi from './config.api'

class AuthApi {
	private readonly name = 'auth'

	private _getApiUrl() {
		return `${configApi.baseUrl}/auth`
	}

	async loginOrRegister(ipts: AuthLoginOrRegister) {
		try {
			const res = await apiClient.http.post<User>(`${this._getApiUrl()}/loginOrRegister`, ipts)
			return res.data
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	async verify(ipts: AuthVerify): Promise<AuthVerifyResponse> {
		try {
			const res = await apiClient.http.post<AuthVerifyResponse>(`${this._getApiUrl()}/verify`, ipts)
			return res.data
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}

export const authApi = new AuthApi()
export default authApi
