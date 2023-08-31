const apiClient = require("../../common/apiClient");
const { mergeEnvironments } = require("./_mergeEnvironments");

jest.mock("../../common/apiClient", () => {
  return {
    getEnvironment: jest.fn(),
    createEnvironment: jest.fn(),
  };
});

console.log = jest.fn();

describe("test mergeEnvironments", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("when three environments are returned then all the variables are merged", async () => {
    apiClient.getEnvironment
      .mockResolvedValueOnce({
        id: "ENVIRONMENT_ID_1",
        values: [
          { key: "VARIABLE_1", value: "VARIABLE_1_VALUE" },
          { key: "VARIABLE_2", value: "VARIABLE_1_OLD_VALUE" },
        ],
      })
      .mockResolvedValueOnce({
        id: "ENVIRONMENT_ID_2",
        values: [
          { key: "VARIABLE_2", value: "VARIABLE_2_VALUE" },
          { key: "VARIABLE_3", value: "VARIABLE_3_OLD_VALUE" },
        ],
      })
      .mockResolvedValueOnce({
        id: "ENVIRONMENT_ID_3",
        values: [
          { key: "VARIABLE_3", value: "VARIABLE_3_VALUE" },
          { key: "VARIABLE_4", value: "VARIABLE_4_VALUE" },
        ],
      })
      .mockResolvedValueOnce({
        id: "RETURNED_BY_LAST_GET_ENVIRONMENT",
      });
    apiClient.createEnvironment.mockResolvedValue({ id: "NEW_ENVIRONMENT_ID" });
    const result = await mergeEnvironments(
      "API_KEY",
      "WORKSPACE_ID",
      "NEW ENVIRONMENT NAME",
      ["ENVIRONMENT_ID_1", " ENVIRONMENT_ID_2", " ENVIRONMENT_ID_3"],
    );
    expect(result).toEqual({
      id: "RETURNED_BY_LAST_GET_ENVIRONMENT",
    });
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(4);
    expect(apiClient.createEnvironment).toHaveBeenCalledTimes(1);
    expect(apiClient.createEnvironment).toHaveBeenCalledWith(
      "API_KEY",
      "WORKSPACE_ID",
      {
        environment: {
          name: "NEW ENVIRONMENT NAME",
          values: [
            { key: "VARIABLE_1", value: "VARIABLE_1_VALUE" },
            { key: "VARIABLE_2", value: "VARIABLE_2_VALUE" },
            { key: "VARIABLE_3", value: "VARIABLE_3_VALUE" },
            { key: "VARIABLE_4", value: "VARIABLE_4_VALUE" },
          ],
        },
      },
    );
  });
});
