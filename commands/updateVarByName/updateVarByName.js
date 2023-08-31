#!/usr/bin/env node

const { updateVarByName } = require("./_updateVarByName");

//get the api key from the environment variables
const apiKey = process.env.POSTMAN_API_KEY;
if (!apiKey) {
  console.error("Please set the POSTMAN_API_KEY environment variable");
  process.exit(1);
}

//get the environment id from the command line
const args = require("yargs").argv;
const workspaceId = args.workspaceId;
const variableName = args.variableName;
const variableValue = args.variableValue;

//if any of the arguments are missing, exit
if (!workspaceId || !variableName || !variableValue) {
  console.error(
    "Usage: updateVarByName.js --workspaceId=WORKSPACE_ID --variableName=VARIABLE_NAME --variableValue=VARIABLE_VALUE",
  );
  process.exit(1);
}

updateVarByName(apiKey, workspaceId, variableName, variableValue)
  .then((variablesUpdated) => {
    console.log(`Updated ${variablesUpdated} variables`);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
