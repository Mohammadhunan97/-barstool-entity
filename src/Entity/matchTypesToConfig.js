const matchTypesToConfig = (requestValueType, neededType) => {
  if (neededType.toLowerCase() === requestValueType) {
    return true;
  } else {
    return false;
  }
};

export default matchTypesToConfig;
