#!/usr/bin/env node

const { listEnvsWithVarValue } = require("./_listEnvsWithVarValue");

//get the api key from the environment variables
const apiKey = process.env.POSTMAN_API_KEY;
if (!apiKey) {
  console.error("Please set the POSTMAN_API_KEY environment variable");
  process.exit(1);
}

//get the environment id from the command line
const args = require("yargs").argv;
const workspaceId = args.workspaceId;
const variableValue = args.variableValue;

//if any of the arguments are missing, exit
if (!workspaceId || !variableValue) {
  console.error(
    "Usage: listEnvsWithVarValue.js --workspaceId=WORKSPACE_ID --variableValue=VARIABLE_VALUE",
  );
  process.exit(1);
}

listEnvsWithVarValue(apiKey, workspaceId, variableValue)
  .then((variablesFound) => {
    console.log(`Found ${variablesFound} variables`);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
