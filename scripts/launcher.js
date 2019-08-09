const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const cwd = process.cwd();
const log = logger('[monorepo-songkoro]');

const processDefinitions = {
  sandbox: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/sandbox',
      stdio: 'inherit',
    },
  ),
};

function launcher() {
  try {
    log('launcher(): argv: %j, cwd: %s', argv, cwd);

    const Launcher = createLauncher({
      processDefinitions,
    });

    Launcher.run({
      process: argv.process,
    });
  } catch (err) {
    log('launcher(): Error reading file', err);
  }
}

module.exports = launcher;

if (require.main === module) {
  launcher();
}
