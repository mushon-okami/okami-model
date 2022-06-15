import { Deployment, FullUpdateBody } from './../interfaces'
import { AxiosResponse } from 'axios'

import { CRUDApi } from './crud.api'
import { IApiClient } from './interfaces.api'
import configApi from './config.api'
import apiClient from './apiClient'

class DeploymentApi extends CRUDApi<any> {
	readonly entityName = 'Deployment'

	protected getApiUrl(): string {
		return `${configApi.baseUrl}/deployments`
	}

	async fullUpdateEntity(id: string, updatedEntity: Deployment) {
		try {
			console.log(updatedEntity)
			const response = (await this.apiClient.http.put<any>(`${this.getApiUrl()}/${id}`, { deployment: updatedEntity, restartMode: 'update' } as FullUpdateBody)) as AxiosResponse<any>

			const entity = response.data

			return entity
		} catch (err) {
			throw err
		}
	}

	async updateEntity(id: string, updatedEntity: Deployment) {
		try {
			console.log(updatedEntity)
			const response = (await this.apiClient.http.put<any>(`${this.getApiUrl()}/${id}`, { deployment: updatedEntity, restartMode: 'update' } as FullUpdateBody)) as AxiosResponse<any>

			const entity = response.data

			return entity
		} catch (err) {
			throw err
		}
	}

	constructor({ apiClient }: { apiClient: IApiClient }) {
		super({ apiClient })
	}
}

export const deploymentApi = new DeploymentApi({ apiClient })
export default deploymentApi
