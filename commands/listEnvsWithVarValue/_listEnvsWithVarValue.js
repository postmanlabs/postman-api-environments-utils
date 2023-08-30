const {
  getAllEnvironments,
  getEnvironment,
} = require("../../common/apiClient");

const listEnvsWithVarValue = async (apiKey, workspaceId, variableValue) => {
  //get all the environments
  const environments = await getAllEnvironments(apiKey, workspaceId);
  let variablesFound = 0;
  console.log(`Found ${environments.length} environments`);

  //find all the environments with the matching variable value
  for (const environment of environments) {
    const environmentDetails = await getEnvironment(apiKey, environment.id);
    const variable = environmentDetails.values.find(
      (variable) => variable.value === variableValue
    );
    if (variable) {
      console.log(
        `Found variable "${variable.key}" in environment "${environmentDetails.name}" (${environment.id}) with value "${variableValue}"`
      );
      variablesFound++;
    }
  }
  return variablesFound;
};

module.exports = {
  listEnvsWithVarValue,
};
