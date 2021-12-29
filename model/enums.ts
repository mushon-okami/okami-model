//#region Deployment
export enum EDeploymentExecutionStatus {
  Deleted = "Deleted",
  Running = "Running",
  StoppedFailed = "StoppedFailed",
  StoppedSucceded = "StoppedSucceded",
}

export enum EDeploymentImageType {
  NodeJS = 'nodejs',
  Paython2 = 'paython2',
  Paython3 = 'paython3',
  Ubuntu = 'ubuntu',
  Centos = 'centos',
  Java = 'Java',
  Go = 'go',
  DockerHubImage = 'dockerHubImage'
} 
//#endregion Deployment




