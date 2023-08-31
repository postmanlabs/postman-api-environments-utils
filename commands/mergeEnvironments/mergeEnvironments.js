#!/usr/bin/env node

const { mergeEnvironments } = require("./_mergeEnvironments");

//get the api key from the environment variables
const apiKey = process.env.POSTMAN_API_KEY;
if (!apiKey) {
  console.error("Please set the POSTMAN_API_KEY environment variable");
  process.exit(1);
}

//get the environment id from the command line
const args = require("yargs").argv;
const workspaceId = args.workspaceId;
const newEnvironmentName = args.newEnvironmentName;
const environments = args.environments;

//if any of the arguments are missing, exit
if (
  !newEnvironmentName ||
  !environments ||
  environments.split(",").length < 2
) {
  console.error(
    "Usage: mergeEnvironments.js --workspaceId=WORKSPACE_ID --newEnvironmentName=NEW_NAME --environments=ENV_1_ID,ENV_2_ID,ENV_3_ID...",
  );
  console.error(
    "workspaceId: The ID of the workspace where the environment will be created",
  );
  console.error(
    "Environments are merged in the order of the comma-separated list (last value remains)",
  );
  process.exit(1);
}

mergeEnvironments(
  apiKey,
  workspaceId,
  newEnvironmentName,
  environments.split(","),
)
  .then((newEnvironmentDetail) => {
    console.log(
      `Created new environment "${newEnvironmentName}" with ID ${newEnvironmentDetail.id} and details:`,
    );
    console.log(JSON.stringify(newEnvironmentDetail, null, 2));
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
