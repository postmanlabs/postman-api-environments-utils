const apiClient = require("../../common/apiClient");
const { listEnvsWithVarValue } = require("./_listEnvsWithVarValue");

jest.mock("../../common/apiClient", () => {
  return {
    getAllEnvironments: jest
      .fn()
      .mockResolvedValue([
        { id: "ENVIRONMENT_ID_1" },
        { id: "ENVIRONMENT_ID_2", name: "ENVIRONMENT_NAME_2" },
      ]),
    getEnvironment: jest.fn(),
  };
});

console.log = jest.fn();

describe("test listEnvsWithVarValue", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("when two environments are returned and one of them contains the value it's ", async () => {
    apiClient.getEnvironment
      .mockResolvedValueOnce({
        name: "ENVIRONMENT_NAME_1",
        values: [{ key: "VARIABLE_NAME", value: "VARIABLE_VALUE" }],
      })
      .mockResolvedValueOnce({
        name: "ENVIRONMENT_NAME_2",
        values: [
          { key: "ANOTHER_VARIABLE_NAME", value: "DIFFERENT_VARIABLE_VALUE" },
        ],
      });
    const result = await listEnvsWithVarValue(
      "API_KEY",
      "WORKSPACE_ID",
      "VARIABLE_VALUE",
    );
    expect(result).toEqual(1);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(2);
    expect(console.log.mock.calls).toEqual([
      ["Found 2 environments"],
      [
        'Found variable "VARIABLE_NAME" in environment "ENVIRONMENT_NAME_1" (ENVIRONMENT_ID_1) with value "VARIABLE_VALUE"',
      ],
    ]);
  });

  test("when two environments are returned and no one of them contains the variable, no variable is displayed in the console", async () => {
    apiClient.getEnvironment.mockResolvedValue({
      values: [{ key: "ANOTHER_VARIABLE_NAME", value: "OTHER_VARIABLE_VALUE" }],
    });
    const result = await listEnvsWithVarValue(
      "API_KEY",
      "WORKSPACE_ID",
      "NEW_VARIABLE_VALUE",
    );
    expect(result).toEqual(0);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(2);
    expect(console.log.mock.calls).toEqual([["Found 2 environments"]]);
  });

  test("when no environments are returned then there are no calls to get environment and no variable is displayed in the console", async () => {
    apiClient.getAllEnvironments.mockResolvedValue([]);
    const result = await listEnvsWithVarValue(
      "API_KEY",
      "WORKSPACE_ID",
      "NEW_VARIABLE_VALUE",
    );
    expect(result).toEqual(0);
    expect(apiClient.getAllEnvironments).toHaveBeenCalledTimes(1);
    expect(apiClient.getEnvironment).toHaveBeenCalledTimes(0);
    expect(console.log.mock.calls).toEqual([["Found 0 environments"]]);
  });
});
