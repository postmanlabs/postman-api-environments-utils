# postman-api-environments-utils

> This code is part of a blog post and is **not** actively maintained by Postman.

Examples of utilities to manage Postman environments using the Postman API.

# Contents

Shell commands that allow you to solve three different use cases with Postman environments using the [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/collection/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a).

All the commands are located in the folder [commands](commands).

## listEnvsWithVarValue

For a workspace, lists all the environments and variables that contain a specific value.

Example:

```shell
➜  listEnvsWithVarValue git:(main) ./listEnvsWithVarValue.js --workspaceId=86d76555-4383-4a6d-aea4-d7c660143f42 --variableValue="token"
Found 8 environments
Found variable "auth" in environment "Stage" (ba2f563e-2557-4d2d-bc0c-07ed98ccc10a) with value "token"
Found variable "token" in environment "Production" (62bc4333-6724-44c0-b2d4-32261f01985e) with value "token"
Found variable "key" in environment "Local" (59b619aa-e136-44a8-8734-45c01e607931) with value "token"
Found 3 variables
```

## mergeEnvironments

Receives a list of environment ids and created a new environment on the specified workspace, that will contain all the different variables (keys) of the source environments. Prints the new environment info on the screen.

Example:

```shell
➜  mergeEnvironments git:(main) ./mergeEnvironments.js --workspaceId=86d76555-4383-4a6d-aea4-d7c660143f42 --newEnvironmentName="Merged environment" --environments=16473433-59b619aa-e136-44a8-8734-45c01e607931,16473433-62bc4333-6724-44c0-b2d4-32261f01985e,16473433-ba2f563e-2557-4d2d-bc0c-07ed98ccc10a
Created new environment "Merged environment" with ID af1f16b4-116e-4c5d-be2b-484ca22b9ade and details:
{
  "id": "af1f16b4-116e-4c5d-be2b-484ca22b9ade",
  "name": "Merged environment",
  "owner": "16473433",
  "createdAt": "2023-08-30T13:07:04.000Z",
  "updatedAt": "2023-08-30T13:07:04.000Z",
  "values": [
    {
      "key": "key",
      "value": "token",
      "enabled": true,
      "type": "default"
    },
    {
      "key": "token",
      "value": "token",
      "enabled": true,
      "type": "default"
    },
    {
      "key": "common",
      "value": "value 7",
      "enabled": true,
      "type": "default"
    },
    {
      "key": "auth",
      "value": "token",
      "enabled": true,
      "type": "default"
    }
  ],
  "isPublic": false
}
```

## updateVarByName

Updates the value of all the variables with a specific name of the environments of a workspace with the provided value.

Example:

```shell
➜  updateVarByName git:(main) ./updateVarByName.js --workspaceId=86d76555-4383-4a6d-aea4-d7c660143f42 --variableName=common --variableValue="value 7"
Found 8 environments
Processing environment ba2f563e-2557-4d2d-bc0c-07ed98ccc10a
  Updating variable "common" in environment from "value 6" to "value 7"
Processing environment 0a5f9210-1977-4549-96b8-423f94f228cf
Processing environment 53f09c0a-9d0c-464e-9115-a54f8a914a0a
Processing environment 59b619aa-e136-44a8-8734-45c01e607931
  Updating variable "common" in environment from "value 6" to "value 7"
Processing environment 3f8231ee-757e-4d5f-9948-1801a3b4043d
Processing environment 62bc4333-6724-44c0-b2d4-32261f01985e
  Updating variable "common" in environment from "value 6" to "value 7"
Processing environment ac748eb5-6477-421c-93ab-e6df73c284d8
Processing environment 23e27594-48dd-407f-a1d6-c4068e1f0ea5
Updated 3 variables
```
