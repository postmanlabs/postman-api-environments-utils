const axios = require("axios");
const { getAxiosConfig } = require("./axiosUtils");
const { POSTMAN_API_BASE_URL } = require("./constants");
const apiClient = require("./apiClient");

jest.mock("axios");
jest.mock("./axiosUtils", () => {
  return {
    getAxiosConfig: jest.fn().mockReturnValue({}),
  };
});
const axiosGet = axios.get;
const axiosPut = axios.put;

describe("test getAllEnvironments", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("calls the Postman API with the proper URL", async () => {
    axiosGet.mockResolvedValue({
      status: 200,
      data: { environments: [{ id: "ENVIRONMENT_ID" }] },
    });
    const apiKey = "API_KEY";
    const workspaceId = "WORKSPACE_ID";
    await apiClient.getAllEnvironments(apiKey, workspaceId);
    expect(getAxiosConfig).toHaveBeenCalledTimes(1);
    expect(getAxiosConfig).toHaveBeenCalledWith(apiKey);
    expect(axiosGet).toHaveBeenCalledTimes(1);
    expect(axiosGet).toHaveBeenCalledWith(
      `${POSTMAN_API_BASE_URL}/environments?workspace=${workspaceId}`,
      {}
    );
  });
});

describe("test getEnvironment", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("calls the Postman API with the proper URL", async () => {
    const environmentId = "ENVIRONMENT_ID";
    axiosGet.mockResolvedValue({
      status: 200,
      data: { environment: [{ id: environmentId }] },
    });
    const apiKey = "API_KEY";
    await apiClient.getEnvironment(apiKey, environmentId);
    expect(getAxiosConfig).toHaveBeenCalledTimes(1);
    expect(getAxiosConfig).toHaveBeenCalledWith(apiKey);
    expect(axiosGet).toHaveBeenCalledTimes(1);
    expect(axiosGet).toHaveBeenCalledWith(
      `${POSTMAN_API_BASE_URL}/environments/${environmentId}`,
      {}
    );
  });
});

describe("test updateEnvironment", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("calls the Postman API with the proper URL", async () => {
    const environmentId = "ENVIRONMENT_ID";
    axiosPut.mockResolvedValue({
      status: 200,
      data: { environment: [{ id: environmentId }] },
    });
    const apiKey = "API_KEY";
    const environmentContents = "test";
    await apiClient.updateEnvironment(
      apiKey,
      environmentId,
      environmentContents
    );
    expect(getAxiosConfig).toHaveBeenCalledTimes(1);
    expect(getAxiosConfig).toHaveBeenCalledWith(apiKey);
    expect(axiosPut).toHaveBeenCalledTimes(1);
    expect(axiosPut).toHaveBeenCalledWith(
      `${POSTMAN_API_BASE_URL}/environments/${environmentId}`,
      environmentContents,
      {}
    );
  });
});
