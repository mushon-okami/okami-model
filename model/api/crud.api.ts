import { AxiosResponse } from "axios";
import { IApiClient } from "./interfaces.api";

export abstract class CRUDApi<T extends { id?: string }> {
  abstract readonly entityName: string;

  protected readonly apiClient: IApiClient;

  protected abstract getApiUrl(): string;

  constructor({ apiClient }: { apiClient: IApiClient }) {
    this.apiClient = apiClient;
  }

  async getEntities<TFilter = any>(filter?: TFilter): Promise<Map<string, T>> {
    try {
      const urlSearchParams = new URLSearchParams();
      if (filter) {
        urlSearchParams.append("filter", JSON.stringify(filter));
      }

      const response = (await this.apiClient.http.get(
        `${this.getApiUrl()}${
          urlSearchParams ? "?" + urlSearchParams.toString() : ""
        }`
      )) as AxiosResponse<T[]>;

      const entities = response.data;

      const mapEntities = entities.reduce(
        (map, entity) => map.set(entity.id!, entity),
        new Map<string, T>()
      );

      return mapEntities;
    } catch (err) {
      throw err;
    }
  }

  async getEntity(id: string, filter?: URLSearchParams): Promise<T> {
    try {
      const response = (await this.apiClient.http.get(
        `${this.getApiUrl()}/${id}`
      )) as AxiosResponse<T>;

      const entitiy = response.data;

      return entitiy;
    } catch (err) {
      throw err;
    }
  }

  async createEntity(entity: T) {
    try {
      const response = (await this.apiClient.http.post<T>(
        this.getApiUrl(),
        entity
      )) as AxiosResponse<T>;

      const entityRes = response.data;
      return entityRes;
    } catch (err) {
      throw err;
    }
  }

  async updateEntity(id: string, updatedEntity: T) {
    try {
      const response = (await this.apiClient.http.put<T>(
        `${this.getApiUrl()}/${id}`,
        updatedEntity
      )) as AxiosResponse<T>;

      const entity = response.data;

      return entity;
    } catch (err) {
      throw err;
    }
  }

  async updateEntities(updatedEntities: T[]): Promise<Map<string, T>> {
    try {
      const response = (await this.apiClient.http.put<T[]>(
        `${this.getApiUrl()}/bulkUpdate`,
        updatedEntities
      )) as AxiosResponse<T[]>;

      const entities = response.data;

      const mapEntities = entities.reduce(
        (map, entity) => map.set(entity.id!, entity),
        new Map<string, T>()
      );

      return mapEntities;
    } catch (err) {
      throw err;
    }
  }

  async deleteEntity(id: string) {
    try {
      return (await this.apiClient.http.delete(
        `${this.getApiUrl()}/${id}`
      )) as AxiosResponse<undefined>;
    } catch (err) {
      throw err;
    }
  }

  async patchEntity(id: string, entity: Partial<T>) {
    try {
      const response = await this.apiClient.http.patch<T>(
        `${this.getApiUrl()}/${id}`,
        entity
      );

      const entityRes = response.data;

      return entityRes;
    } catch (err) {
      throw err;
    }
  }
}
