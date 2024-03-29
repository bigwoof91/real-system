const fs = require('fs');
const yaml = require('js-yaml');
const { getWorkspacesInfo } = require('./workspaceUtils');
const { writeToFile } = require('./writeToFile');
const { logger } = require('./logger');

const DEPENDABOT_CONFIG_PATH = `${__dirname}/../../.github/dependabot.yml`;
const applyUpdate = (directory, restOptions = {}) => ({
  'package-ecosystem': 'npm',
  directory,
  schedule: { interval: 'weekly' },
  labels: ['area: infra', 'area: security', 'area: repo'],
  ...restOptions,
});

const staticUpdates = [
  applyUpdate('/', { 'package-ecosystem': 'github-actions' }),
  applyUpdate('/', { 'package-ecosystem': 'npm' }),
];

const makeTemplate = (packages) => {
  const updates = staticUpdates;

  packages.forEach((pkg) => {
    updates.push(applyUpdate(`/${pkg.location}`));
  });

  return updates;
};

async function updateDependabotConfig() {
  logger.info('Updating dependabot config');

  const { pkgList } = await getWorkspacesInfo({ withCore: true });

  let dependabot = yaml.load(fs.readFileSync(DEPENDABOT_CONFIG_PATH, 'utf-8'));
  const updates = makeTemplate(pkgList);

  dependabot.updates = updates;

  await writeToFile(DEPENDABOT_CONFIG_PATH, yaml.dump(dependabot), {
    successMessage: 'Updated dependabot config',
  });
}

module.exports = { updateDependabotConfig };
