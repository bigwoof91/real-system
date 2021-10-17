/* eslint-disable no-unused-vars */
const fs = require('fs');
const { logger, writeToFile } = require('../../../../tools/utils');
const { getWorkspacesInfo } = require('./subPackageUtils');

const writePkgJson = async (pkg) => {
  const packageJson = require(`${__dirname}/../../../${pkg}/package.json`);
  const pkgJson = {
    name: packageJson.name,
    version: packageJson.version,
    private: true,
    sideEffects: false,
    main: `../lib/${pkg}.js`,
    types: `../lib/${pkg}.d.ts`,
  };

  const dir = `../core/${pkg}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return await writeToFile(`${dir}/package.json`, pkgJson, {
    formatJson: true,
  });
};

/**
 * @function generatePkgJson bundle esm & cjs package for unbarreled exports
 */
async function generatePkgJson() {
  const { pkgList } = getWorkspacesInfo();

  for (let i = 0; i < pkgList.length; i++) {
    const pkg = pkgList[i];
    const pureName = pkg.pureName;

    logger.magenta(`Generating ${pkg.name} \n`);
    await writePkgJson(pureName);
    logger.green('Generated package.json \n');
    logger.blue('-------------------------------------------------- \n');
  }
}

module.exports = generatePkgJson;
