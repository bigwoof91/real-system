const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const { relative } = require('path');
const { generateTemplateFiles } = require('generate-template-files');
const {
  getWorkspacesInfo,
  ROOT_PATH,
  writeToFile,
  logger,
} = require('./utils');
const { commandSync } = require('execa');

inquirer.registerPrompt(
  'checkbox-plus',
  require('inquirer-checkbox-plus-prompt')
);

const PATH_TO_TOOLS = `${ROOT_PATH}/tools`;
const makePaths = (pkgLocation) => {
  const PATH_TO_WORKSPACE_TOOLS = `${pkgLocation}/tools`;
  return {
    PATH_TO_BUILD_SCRIPT: relative(
      PATH_TO_WORKSPACE_TOOLS,
      `${PATH_TO_TOOLS}/build`
    ),
    PATH_TO_DEV_SCRIPT: relative(
      PATH_TO_WORKSPACE_TOOLS,
      `${PATH_TO_TOOLS}/dev`
    ),
    PATH_TO_TSCONFIG: relative(`${pkgLocation}`, `${ROOT_PATH}/tsconfig.json`),
  };
};

/**
 * @todo refactor to use plop templates
 */
(async function generatePackage() {
  const { coreDependencies } = await getWorkspacesInfo();
  const peerDepsChoices = Object.keys(coreDependencies).map((name) => ({
    name,
    value: { version: coreDependencies[name], name },
  }));

  inquirer
    .prompt([
      // first prompt with pre-set real-system dependencies
      {
        type: 'checkbox-plus',
        name: 'peerDeps',
        message: 'Select peer dependencies for your package.',
        pageSize: 10,
        highlight: true,
        searchable: true,
        source: (_answersSoFar, input = '') =>
          new Promise(function (resolve) {
            const fuzzyResult = fuzzy.filter(input, peerDepsChoices, {
              extract: function (el) {
                return el.name;
              },
            });
            const data = fuzzyResult.map((element) => element.original);
            resolve(data);
          }),
      },
    ])
    .then((answers) => {
      const { peerDeps: peerDepsAnswer } = answers;
      const peerDeps = Object.values(peerDepsAnswer).reduce(
        (a, c) => ({
          ...a,
          [c.name]: c.version,
        }),
        {}
      );

      const makeOptions = ({ option, outputPath, type }) => {
        const { PATH_TO_BUILD_SCRIPT, PATH_TO_DEV_SCRIPT, PATH_TO_TSCONFIG } =
          makePaths(outputPath);

        return {
          option,
          entry: {
            folderPath: './tools/templates/package/',
          },
          stringReplacers: [
            {
              question: 'Insert the name of your package e.g. combo-box',
              slot: '__pkg__',
            },
            {
              question: 'Insert the author of the package (first & last name)',
              slot: '__author__',
            },
            {
              question: 'Insert description of the package',
              slot: '__description__',
            },
            {
              question: 'Insert the name of the primary export e.g. ComboBox',
              slot: '__primary_export__',
            },
          ],
          dynamicReplacers: [
            {
              slot: '__pkg_type__',
              slotValue: type === 'Library' ? 'Librarie' : type,
            },
            {
              slot: '__peer_deps_list__',
              slotValue: Object.keys(peerDeps).join(' '),
            },
            {
              slot: '__path_to_tsconfig__',
              slotValue: PATH_TO_TSCONFIG,
            },
            {
              slot: '__path_to_build_script__',
              slotValue: PATH_TO_BUILD_SCRIPT,
            },
            {
              slot: '__path_to_dev_script__',
              slotValue: PATH_TO_DEV_SCRIPT,
            },
          ],
          output: {
            path: outputPath,
          },
          onComplete: async ({ output }) => {
            // update package json with selected peer dependencies from initial inquirer prompt
            const PATH_TO_PACKAGE_JSON = `${output.path}/package.json`;
            const packageJson = require(PATH_TO_PACKAGE_JSON);
            packageJson.peerDependencies = {
              ...peerDeps,
              ...packageJson.peerDependencies,
            };
            packageJson.devDependencies = {
              ...peerDeps,
              ...packageJson.devDependencies,
            };
            await writeToFile(PATH_TO_PACKAGE_JSON, packageJson, {
              formatJson: true,
              successMessage: 'Inserted peer dependencies.',
              errorMessage: 'Failed to insert peer dependencies.',
            });
            logger.job('Updating yarn lock file.');
            commandSync('yarn install', { stdout: process.stdout });
            logger.job('Building package.');
            commandSync('yarn build', {
              cwd: output.path,
              stdout: process.stdout,
            });
          },
        };
      };

      generateTemplateFiles([
        makeOptions({
          option: 'Component Package',
          outputPath: `${ROOT_PATH}/packages/components/__pkg__(kebabCase)`,
          type: 'Component',
        }),
        makeOptions({
          option: 'Library Package',
          outputPath: `${ROOT_PATH}/packages/libraries/__pkg__(kebabCase)`,
          type: 'Library',
        }),
        makeOptions({
          option: 'Primitive Package',
          outputPath: `${ROOT_PATH}/packages/primitives/__pkg__(kebabCase)`,
          type: 'Primitive',
        }),
      ]);
    });
})();
