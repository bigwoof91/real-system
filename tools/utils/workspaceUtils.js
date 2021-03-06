const path = require('path');
const { command } = require('execa');
const { PACKAGE_STATUS_CONFIG } = require('./env');

const getPkgJsonFromWorkspace = (workspace) =>
  require(`${__dirname}/../../${workspace.location}/package.json`);

const getPurePkgName = (pkgName) => pkgName.replace('@real-system/', '');
const getFullPkgName = (pkgName) => `@real-system/${pkgName}`;

const parseJsonList = (data) =>
  data
    .toString()
    .split(require('os').EOL)
    .filter(Boolean)
    .map((x) => JSON.parse(x))
    .filter((x) => x.name !== 'real-system')
    .reduce((a, b) => ({ ...a, [b.name]: b }), {});

const getWorkspaceData = (data) => ({
  workspaceInfo: data,
  pkgJson: getPkgJsonFromWorkspace(data),
});

const DEFAULT_CONFIG = { withCore: false, hasProdStatus: undefined };

/**
 *
 * @param {object} config Configuration object for getWorkspacesInfo.
 * @param {boolean} config.hasProdStatus Will return workspaces (packages) that are production-ready.
 * @param {boolean} config.withCore Will return the `core` workspace (packages).
 */
const getWorkspacesInfo = async (config = DEFAULT_CONFIG) => {
  let data = await command('yarn workspaces list --json');

  return new Promise((resolve, reject) => {
    try {
      data = parseJsonList(data.stdout);
    } catch (err) {
      reject(err);
    }

    const coreDependencies = {};
    const purePkgNames = [];
    const pkgCache = [];
    const workspaceNames = Object.keys(data)
      .filter((name) => (config.withCore ? true : !name.includes('core')))
      .filter((name) => {
        const { pkgJson } = getWorkspaceData(data[name]);
        const isProductionReady = PACKAGE_STATUS_CONFIG[pkgJson.status];
        if (config.hasProdStatus === false) {
          return !isProductionReady;
        } else if (config.hasProdStatus) {
          return isProductionReady;
        }
        return true;
      })
      .sort();

    const pkgList = workspaceNames.map((name) => {
      const { workspaceInfo, pkgJson } = getWorkspaceData(data[name]);

      // push pure name
      const pureName = getPurePkgName(name);
      purePkgNames.push(pureName);
      // push to coreDependencies if package is productionized (ready for release)
      if (PACKAGE_STATUS_CONFIG[pkgJson.status]) {
        coreDependencies[name] = `^${pkgJson.version}`;
      }

      const pkg = {
        name,
        pureName,
        relativeLocationFromCore: path.resolve(
          __dirname,
          `../../packages/${pureName}`
        ),
        version: pkgJson.version,
        ...workspaceInfo,
      };

      // push to pkgCache
      pkgCache.push({
        name,
        version: pkgJson.version,
        private: false,
        location: path.resolve(__dirname, '../..', workspaceInfo.location),
      });

      return pkg;
    });

    resolve({
      pkgCache,
      pkgList,
      pkgNames: workspaceNames,
      purePkgNames: purePkgNames,
      data,
      coreDependencies,
    });
  });
};

module.exports = {
  getFullPkgName,
  getPurePkgName,
  getWorkspacesInfo,
};
