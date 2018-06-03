const test = require('tape');
const mock = require('mock-require');

const { TEST_CONFIG } = require('./resource');
const TEST_ENV = {
  PWD: '/root',
  PLUGIN_MIRRORS: '[{"id":"private","name":"mirror","mirror_of":"central","url":"url"}]',
  PLUGIN_SERVERS: '[{"id":"server_id","username":"server_user","password":"server_pwd"}]',
  PLUGIN_PROFILES: '[{"id":"profile_id","properties":{"foo":"bar"}}]',
  PLUGIN_ACTIVE_PROFILES: 'profile_id',
};

let fileContent;

mock('fs', {
  writeFileSync: (fileName, content) => {
    return (fileContent = content);
  },
});
mock('process', {
  env: TEST_ENV,
  exit: noop,
});

function noop() {}

test('readConfig test', function(t) {
  const { readConfig } = require('../src/index');
  const { env } = require('process');

  t.deepEqual(readConfig(env), TEST_CONFIG);
  t.end();
});

test('write file test', function(t) {
  require('../src/index')

  t.ok(fileContent.length > 0, 'has content.');
  t.end();
});
