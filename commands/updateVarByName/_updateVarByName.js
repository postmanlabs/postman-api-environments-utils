const {
  getAllEnvironments,
  updateEnvironment,
  getEnvironment,
} = require("../../common/apiClient");

const updateVarByName = async (
  apiKey,
  workspaceId,
  variableName,
  variableValue,
) => {
  //get all the environments
  const environments = await getAllEnvironments(apiKey, workspaceId);
  let variablesUpdated = 0;
  console.log(`Found ${environments.length} environments`);

  //find all the environments with the matching variable name and update them
  for (const environment of environments) {
    console.log(`Processing environment ${environment.id}`);
    const environmentDetails = await getEnvironment(apiKey, environment.id);
    const variable = environmentDetails.values.find(
      (variable) => variable.key === variableName,
    );
    if (variable) {
      console.log(
        `  Updating variable "${variableName}" in environment from "${variable.value}" to "${variableValue}"`,
      );
      variable.value = variableValue;
      try {
        await updateEnvironment(apiKey, environment.id, {
          environment: { ...environmentDetails },
        });
      } catch (error) {
        console.error(`Error updating environment ${environment.id}: ${error}`);
        process.exit(1);
      }
      variablesUpdated++;
    }
  }
  return variablesUpdated;
};

module.exports = {
  updateVarByName,
};
