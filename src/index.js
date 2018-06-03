const process = require('process');
const fs = require('fs');

const { generateSetting } = require('./plugin');

function readConfig(env) {
  return ['servers', 'mirrors', 'profiles', 'active_profiles'].reduce(
    (memo, key) => {
      try {
        memo[key] = JSON.parse((env[`PLUGIN_${key.toUpperCase()}`] || '[]'));
      } catch (e) {
        console.error(`parse ${key} fail.`, e);

        process.exit(1);
      }

      return memo;
    },
    {
      local: env['PLUGIN_LOCAL_REPOSITORY'] || `${env.PWD}/repo`,
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
