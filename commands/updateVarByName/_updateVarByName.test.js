const apiClient = require("../../common/apiClient");
const { updateVarByName } = require("./_updateVarByName");

jest.mock("../../common/apiClient", () => {
  return {
    getAllEnvironments: jest
      .fn()
      .mockResolvedValue([
        { id: "ENVIRONMENT_ID_1" },
        { id: "ENVIRONMENT_ID_2" },
      ]),
    getEnvironment: jest.fn(),
    updateEnvironment: jest.fn().mockResolvedValue({}),
  };
});

describe("test updateVarByName", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("when two environments are returned and one of them contains the variable, one update is executed", async () => {
    apiClient.getEnvironment
      .mockResolvedValueOnce({
        values: [{ key: "VARIABLE_NAME", value: "VARIABLE_VALUE" }],
      })
      .mockResolvedValueOnce({
        values: [{ key: "ANOTHER_VARIABLE_NAME", value: "VARIABLE_VALUE" }],
      });
    const result = await updateVarByName(
      "API_KEY",
      "WORKSPACE_ID",
      "VARIABLE_NAME",
      "NEW_VARIABLE_VALUE",
    );
    expect(result).toEqual(1);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(2);
    expect(apiClient.updateEnvironment).toHaveBeenCalledTimes(1);
    expect(apiClient.updateEnvironment).toHaveBeenCalledWith(
      "API_KEY",
      "ENVIRONMENT_ID_1",
      {
        environment: {
          values: [{ key: "VARIABLE_NAME", value: "NEW_VARIABLE_VALUE" }],
        },
      },
    );
  });

  test("when two environments are returned and no one of them contains the variable, no update is executed", async () => {
    apiClient.getEnvironment.mockResolvedValue({
      values: [{ key: "ANOTHER_VARIABLE_NAME", value: "VARIABLE_VALUE" }],
    });
    const result = await updateVarByName(
      "API_KEY",
      "WORKSPACE_ID",
      "NON_EXISTING_VARIABLE_NAME",
      "NEW_VARIABLE_VALUE",
    );
    expect(result).toEqual(0);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(2);
    expect(apiClient.updateEnvironment).toHaveBeenCalledTimes(0);
  });

  test("when no environments are returned then there are no calls to get environment or updateEnvironment", async () => {
    apiClient.getAllEnvironments.mockResolvedValue([]);
    const result = await updateVarByName(
      "API_KEY",
      "WORKSPACE_ID",
      "NON_EXISTING_VARIABLE_NAME",
      "NEW_VARIABLE_VALUE",
    );
    expect(result).toEqual(0);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(0);
    expect(apiClient.updateEnvironment).toHaveBeenCalledTimes(0);
  });
});
