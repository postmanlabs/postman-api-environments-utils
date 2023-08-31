const { remove } = require("lodash");
const {
  getEnvironment,
  createEnvironment
} = require("../../common/apiClient");

const mergeEnvironments = async (
  apiKey,
  workspaceId,
  newEnvironmentName,
  environmentIdList,
) => {
  const allValues = [];
  for (const environment of environmentIdList) {
    const environmentDetails = await getEnvironment(apiKey, environment.trim());
    for (const variable of environmentDetails.values) {
      remove(allValues, (item) => item.key === variable.key);
      allValues.push(variable);
    }
  }

  const environmentContents = {
    name: newEnvironmentName,
    values: allValues,
  };
  try {
    const newEnvironment = await createEnvironment(apiKey, workspaceId, {environment: environmentContents});
    const newEnvironmentDetails = await getEnvironment(apiKey, newEnvironment.id);
    return newEnvironmentDetails;
  } catch (error) {
    console.error(`Error creating environment ${newEnvironmentName}: ${error}`);
    process.exit(1);
  }
};

module.exports = {
  mergeEnvironments,
};
