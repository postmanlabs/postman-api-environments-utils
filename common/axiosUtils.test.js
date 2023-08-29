const { getAxiosConfig } = require("./axiosUtils");

describe("test axiosUtils", () => {
  test("getAxiosConfig returns expected config with headers", () => {
    const API_KEY = "POSTMAN_API_KEY";
    const config = getAxiosConfig(API_KEY);
    expect(config).toEqual({
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
  });
});
