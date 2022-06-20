import mongoose from 'mongoose'
import { EDeploymentStatus } from './enums'

//#region Auth
export interface GitHubAuthInstallId {
	githubInstallationId: string
}
export interface GitHubAuthReposListResponse {
	repos: string[]
}
export interface AuthLoginOrRegister {
	publicKey: User['publicKey']
	contactDetails: User['contactDetails']
}

export interface AuthVerify {
	publicKey: User['publicKey']
	signture: string
}

export interface AuthVerifyResponse {
	valid: boolean
	lastLogin?: Date
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
	contactDetails: string
	publicKey: string
	nonce?: number
	joinData?: Date
	githubInstallationId: string
	accounts?: string[] | Account[] | mongoose.Types.ObjectId[]
}

export interface Account extends BaseModel {
	name: string
	owner: string | User | mongoose.Types.ObjectId
	ownerPublicKey: string
}

export interface Deployment extends BaseModel {
	name: string
	costPerHour?: number
	what: {
		git: string
		branch: string
		cmd: string
	}
	where: {
		image: string
	}
	envVars: KeyVal[]
	portMappings: KeyVal[]
	size: string
	exposeAsService: boolean
	githubInstallationId: string
	// #regions relations
	account: string | mongoose.Types.ObjectId | Account
	status: string
	containers: Map<string, DeploymentContainer>
	deploymentType: string
	// #endregion relations
}

export interface DeploymentContainer extends BaseModel {
	status: string
	startTime: string
	podErrorMessages?: Array<string>
}
export interface FullUpdateBody extends BaseModel {
	deployment: Deployment
	restartMode: string
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
export interface KeyVal {
	key: string
	value: string
}
