const process = require('process');
const fs = require('fs');

const { generateSetting } = require('./plugin');

function readConfig(env) {
  return Object.assign(
    {
      local_repository: `${env.PWD}/repo`,
    },
    JSON.parse(env[`PLUGIN_SETTINGS`] || '{}')
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
