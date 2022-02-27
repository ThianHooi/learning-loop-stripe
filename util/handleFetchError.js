const handleFetchErrors = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.json();
    throw Error(errorMessage.error);
  }
  return response;
};

module.exports = handleFetchErrors;
