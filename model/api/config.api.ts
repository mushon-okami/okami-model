/** needs to be called in init project file  */

class ConfigApi {
	private _baseUrl = process.env.OKAMI_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || `http://localhost:3001/api/v1`

	// setBaseUrl(val: string) {
	//   this._baseUrl = `${val}/api/v1`;
	// }

	get baseUrl() {
		return this._baseUrl
	}
}

export const configApi = new ConfigApi()
export default configApi
