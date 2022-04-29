import mongoose from 'mongoose'
import { EDeploymentExecutionStatus } from './enums'

//#region Auth
export interface GitHubAuthInstallId {
	githubInstallationId: string
}
export interface GitHubAuthReposListResponse {
	repos: string[]
}
export interface AuthLoginOrRegister {
	publicKey: User['publicKey']
	username: User['username']
}

export interface AuthVerify {
	publicKey: User['publicKey']
	signture: string
}

export interface AuthVerifyResponse {
	valid: boolean
	user: User
}
//#endregion Auth

export interface BaseModel {
	id?: any // per mongoose.Document type
	_id?: any
}

export interface GithubRepoList {
	repositories: string[]
}
export interface User extends BaseModel {
	username: string
	publicKey: string
	nonce?: number
	joinData?: Date
	githubInstallationId: string
	accounts?: string[] | Account[] | mongoose.Types.ObjectId[]
}

export interface Account extends BaseModel {
	name: string
	owner: string | User | mongoose.Types.ObjectId
}

export interface Deployment extends BaseModel {
	name: string
	costPerHour?: number
	what: {
		git: string
		cmd: string
	}
	where: {
		image: string
		imageUrl?: string
	}
	envVars: KeyVal[]
	portMappings: KeyVal[]
	size: string
	exposeAsService: boolean
	githubInstallationId: string
	// #regions relations
	account: string | mongoose.Types.ObjectId | Account
	executions: string[] | mongoose.Types.ObjectId[] | DeploymentExecution[]
	status: string
	// #endregion relations
}

export interface K8Deployment extends BaseModel {
	replicas: number
	availableReplicas: string
	created: number
	accountId: string
	type: string /// possible values - DELETED, ADDED, MODIFIED
}

export interface logEvent extends BaseModel {
	deployId: string
	chunk: string
}
export interface DeploymentExecution extends BaseModel {
	status: EDeploymentExecutionStatus
	statusChange: Record<string, EDeploymentExecutionStatus> | Map<string, EDeploymentExecutionStatus>
}

export interface KeyVal {
	key: string
	value: string
}
