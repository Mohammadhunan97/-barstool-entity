import appRootPath from 'app-root-path';
const barstoolPath = `${appRootPath.toString()}/barstool.config.js`;

const retrieveEntitiesFromConfig = () => {
  try {
    const barstoolEntities = require(barstoolPath);
    return barstoolEntities;
  } catch (err) {
    return {
      err,
      errorMessage: `No Barstool Entity and no custom entity given in path ${barstoolPath}`
    };
  }
};
export default retrieveEntitiesFromConfig;
