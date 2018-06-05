const test = require('tape');

const { generateElement, generateSetting } = require('../src/plugin');
const { xml } = require('../src/util');
const { TEST_CONFIG_FULL } = require('./config-example');

test('generate element', function(t) {
  const obj = {
    id: 'server_id',
    username: 'server_user',
    password: 'server_pwd',
  };

  t.equal(
    generateElement('ele')(obj),
    '<ele><id>server_id</id><username>server_user</username><password>server_pwd</password></ele>'
  );

  t.end();
});

test('generate elements with object or array', function(t) {
  const obj = {
    id: 'name',
    properties: {
      bar: 1,
    },
    repositories: [{ id: 1 }, { id: 2 }, { id: 3 }],
    plugin_repositories: []
  };

  t.equal(
    generateElement('profile')(obj),
    [
      '<profile><id>name</id>',
      '<properties><bar>1</bar></properties>',
      '<repositories><repository><id>1</id></repository>',
      '<repository><id>2</id></repository>',
      '<repository><id>3</id></repository></repositories>',
      '<pluginRepositories></pluginRepositories>',
      '</profile>',
    ].join('')
  );

  t.end();
});

test('generate setting', function(t) {
  t.equal(
    generateSetting(TEST_CONFIG_FULL),
    xml`
      <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
        <localRepository>/root/repo</localRepository>
        <mirrors>
          <mirror>
            <id>private</id>
            <name>mirror</name>
            <mirrorOf>central</mirrorOf>
            <url>url</url>
          </mirror>
        </mirrors>
        <servers>
          <server>
            <id>server_id</id>
            <username>server_user</username>
            <password>server_pwd</password>
          </server>
        </servers>
        <profiles>
          <profile>
            <id>profile_id</id>
            <properties>
              <foo>bar</foo>
            </properties>
          </profile>
        </profiles>
        <activeProfiles>
          <activeProfile>profile_id</activeProfile>
        </activeProfiles>
      </settings>`
  );

  t.end();
});
