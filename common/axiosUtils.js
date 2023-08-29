const getAxiosConfig = (postmanApiKey) => {
  return {
    headers: {
      "x-api-key": postmanApiKey,
      "Content-Type": "application/json",
    },
  };
};

module.exports = {
  getAxiosConfig,
};
