import { AxiosResponse } from 'axios'
import { GitHubAuthInstallId, GitHubAuthReposListResponse } from './../interfaces'
import apiClient from './apiClient'
import configApi from './config.api'

class GitAuthApi {
	private readonly name = 'github-auth-api'
	private _getApiUrl() {
		return `${configApi.baseUrl}/github`
	}

	async listGithubRepos(installationId: GitHubAuthInstallId, userId: string): Promise<GitHubAuthReposListResponse> {
		try {
			const res = (await apiClient.http.get<GitHubAuthReposListResponse>(`${this._getApiUrl()}/${userId}/repositories/${installationId}`)) as AxiosResponse<GitHubAuthReposListResponse>
			return res.data
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}

export const githubAuthApi = new GitAuthApi()
export default githubAuthApi
