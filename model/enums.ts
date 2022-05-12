//#region Deployment

export enum EDeploymentStatus {
	down = 'down',
	running = 'running',
	loading = 'loading',
}

export enum EDeploymentImageType {
	NodeJS = 'nodejs',
	Paython2 = 'paython2',
	Paython3 = 'paython3',
	Ubuntu = 'ubuntu',
	Centos = 'centos',
	Java = 'Java',
	Go = 'go',
	DockerHubImage = 'dockerHubImage',
}
//#endregion Deployment
