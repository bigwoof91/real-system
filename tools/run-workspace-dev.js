const { getWorkspacesInfo, logger } = require('./utils');
const argv = require('minimist')(process.argv, {
  default: {
    with: undefined,
    filter: undefined,
    only: undefined,
    select: false,
  },
  boolean: ['select'],
});
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const concurrently = require('concurrently').concurrently;
const { getFullPkgName } = require('./utils');
const semverGtr = require('semver/ranges/gtr');

inquirer.registerPrompt(
  'checkbox-plus',
  require('inquirer-checkbox-plus-prompt')
);

const { prompt } = inquirer;

/**
 * Helpers
 */
const formatArgToArray = (arg) => (argv[arg] ? argv[arg].split(',') : []);

const getFullPkgNames = (pureNames) =>
  pureNames.map((pkgName) => getFullPkgName(pkgName));

const getPackagesToWatch = async () => {
  const { pkgNames } = await getWorkspacesInfo();
  let packagesToWatch = [...pkgNames];

  if (argv['select'] === true) {
    return await prompt([
      {
        type: 'checkbox-plus',
        name: 'packagesToWatch',
        message: 'Select packages to run in watch mode.',
        pageSize: 10,
        highlight: true,
        searchable: true,
        source: (_answersSoFar, input = '') =>
          new Promise(function (resolve) {
            const fuzzyResult = fuzzy.filter(input, pkgNames);
            const data = fuzzyResult.map((element) => element.original);
            resolve(data);
          }),
      },
    ]).then((answers) => {
      return answers.packagesToWatch;
    });
  }

  if (argv.only?.length > 0) {
    return getFullPkgNames(formatArgToArray('only'));
  }
  // filter packages
  if (argv.filter?.length > 0) {
    const packagesToBlock = getFullPkgNames(formatArgToArray('filter'));
    return pkgNames.filter((pkgName) => !packagesToBlock.includes(pkgName));
  }

  return packagesToWatch;
};

const getAdditionalScripts = () => {
  return formatArgToArray('with');
};

/**
 * @description Run workspace development
 * @param {array} filter pure name of real system package. The pure name is the name of the package without the "@real-system/" prefix e.g. box, button, styling, theme.
 * @param {string} with a comma-delimiter list of scripts to run concurrently.
 *
 * * Examples
 * * FILTER packages while working on Box package
 * ```
 * "dev": "node ./tools/run-workspace-dev" // this is the package.json script
 * $ yarn dev --filter=icon,spinner,visually-hidden,typography
 * output:
 *    yarn workspace @real-system/box dev
 *    yarn workspace @real-system/button dev
 *    yarn workspace @real-system/input dev
 *    yarn workspace @real-system/styled-library dev
 *    yarn workspace @real-system/utils-library dev
 *    yarn:storybook
 * ```
 * * run ONLY certain packages
 * ```
 * "dev": "node ./tools/run-workspace-dev" // this is the package.json script
 * $ yarn dev --only=box
 * output:
 *    yarn workspace @real-system/box dev
 *    yarn:storybook
 * ```
 * * SELECT certain packages to run
 * ```
 * "dev": "node ./tools/run-workspace-dev" // this is the package.json script
 * $ yarn dev --select
 * output: opens a cli to select workspaces
 * ```
 */
(async function runWorkspaceDev() {
  if (semverGtr(process.version, '16')) {
    // only required in node17 to resolve a bug
    process.env.NODE_OPTIONS = '--openssl-legacy-provider';
  }

  /** get list of packages to watch/run dev */
  const packagesToWatch = await getPackagesToWatch();

  /** make workspace scripts */
  const workspaceDevScripts = packagesToWatch.map(
    (name) => `yarn workspace ${name} dev`
  );
  /** get any additional scripts to run */
  const withScripts = getAdditionalScripts();
  /** concat workspace scripts and additional scripts */
  const allScripts = workspaceDevScripts.concat(withScripts);

  logger.info('--------- WORKSPACE DEV MODE ---------');
  logger.gray(allScripts.join('\n'));

  concurrently(allScripts, {
    // continue to log stdout when concurrently finishes commands
    pauseInputStreamOnFinish: false,
    // log all processes
    raw: true,
  });
})();
