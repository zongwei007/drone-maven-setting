const test = require('tape');
const mock = require('mock-require');

const { TEST_CONFIG_FULL, TEST_CONFIG_EMPTY } = require('./config-example');
const TEST_ENV_FULL = {
  PWD: '/root',
  PLUGIN_SETTINGS: `{
    "mirrors": [{"id":"private","name":"mirror","mirror_of":"central","url":"url"}],
    "servers": [{"id":"server_id","username":"server_user","password":"server_pwd"}],
    "profiles": [{"id":"profile_id","properties":{"foo":"bar"}}],
    "active_profiles": ["profile_id"]
  }`,
};
const TEST_ENV_EMPTY = {
  PWD: '/root',
};

function noop() {}

test('readConfig test', function(t) {
  mock('fs', {
    writeFileSync: (fileName, content) => {
      return (fileContent = content);
    },
  });
  mock('process', {
    env: TEST_ENV_FULL,
    exit: noop,
  });

  const { readConfig } = require('../src/index');
  const { env } = require('process');

  mock.stopAll();
  t.deepEqual(readConfig(env), TEST_CONFIG_FULL);
  t.end();
});

test('read empty test', function(t) {
  mock('process', {
    env: TEST_ENV_EMPTY,
    exit: noop,
  });

  const { readConfig } = require('../src/index');
  const { env } = require('process');

  mock.stopAll();
  t.deepEqual(readConfig(env), TEST_CONFIG_EMPTY);
  t.end();
});

test('write file test', function(t) {
  let fileContent;

  mock('fs', {
    writeFileSync: (fileName, content) => {
      return (fileContent = content);
    },
  });
  mock('process', {
    env: TEST_ENV_FULL,
    exit: noop,
  });

  mock.reRequire('../src/index');

  mock.stopAll();
  t.ok(fileContent.length > 0, 'has content.');
  t.end();
});
