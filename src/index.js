const process = require('process');
const fs = require('fs');

const { generateSetting } = require('./plugin');

function readConfig(env) {
  return Object.keys(env)
    .filter(name => name.startsWith('PLUGIN_'))
    .reduce(
      (memo, key) => {
        const configKey = key.toLowerCase().replace('plugin_', '');

        let configValue = process.env[key];
        if (configValue.startsWith('[') || configValue.startsWith('{')) {
          configValue = JSON.parse(configValue);
        } else {
          configValue = configValue.split(',');
        }

        memo[configKey] = configValue;

        return memo;
      },
      {
        local_repository: `${env.PWD}/repo`,
      }
    );
}

module.exports = {
  readConfig,
};

console.log('begin to generate maven settings.xml');

try {
  fs.writeFileSync('settings.xml', generateSetting(readConfig(process.env)));
} catch (e) {
  console.error('write settings.xml fail.', e);

  return process.exit(1);
}

console.log('finish to generate maven settings.xml');

return process.exit(0);
