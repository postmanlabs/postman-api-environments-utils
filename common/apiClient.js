const { POSTMAN_API_BASE_URL } = require("./constants");
const axios = require("axios");
const { getAxiosConfig } = require("./axiosUtils");

const getAllEnvironments = async (postmanApiKey, workspaceId) => {
  const url = `${POSTMAN_API_BASE_URL}/environments?workspace=${workspaceId}`;
  const response = await axios.get(url, getAxiosConfig(postmanApiKey));
  return response.data.environments;
};

const getEnvironment = async (postmanApiKey, environmentId) => {
  const url = `${POSTMAN_API_BASE_URL}/environments/${environmentId}`;
  const response = await axios.get(url, getAxiosConfig(postmanApiKey));
  return response.data.environment;
};

const updateEnvironment = async (
  postmanApiKey,
  environmentId,
  environmentContents
) => {
  const url = `${POSTMAN_API_BASE_URL}/environments/${environmentId}`;
  const response = await axios.put(
    url,
    environmentContents,
    getAxiosConfig(postmanApiKey)
  );
  return response;
};

module.exports = {
  getAllEnvironments,
  getEnvironment,
  updateEnvironment,
};
