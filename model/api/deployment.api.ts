import { Deployment } from "./../interfaces";

import { CRUDApi } from "./crud.api";
import { IApiClient } from "./interfaces.api";
import configApi from "./config.api";
import apiClient from "./apiClient";

class DeploymentApi extends CRUDApi<Deployment> {
  readonly entityName = "Deployment";

  protected getApiUrl(): string {
     return `${configApi.baseUrl}/deployments`;
  }

  constructor({ apiClient }: { apiClient: IApiClient }) {
    super({ apiClient });
  }
}

export const deploymentApi = new DeploymentApi({ apiClient });
export default deploymentApi;
