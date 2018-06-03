const test = require('tape');

const { generateElement, generateSetting } = require('../src/plugin');
const { xml } = require('../src/util');
const { TEST_CONFIG } = require('./resource');

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
    array: [1, 2, 3],
    foo: {
      bar: 1,
    },
  };

  t.equal(generateElement('ele')(obj), '<ele><id>name</id><foo><bar>1</bar></foo></ele>');

  t.end();
});

test('generate setting', function(t) {
  t.equal(
    generateSetting(TEST_CONFIG),
    xml`<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"
  >
    <localRepository>/root/.m2</localRepository>
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
        <repositories></repositories>
        <pluginRepositories></pluginRepositories>
      </profile>
    </profiles>
    <activeProfiles>
      <activeProfile>profile_id</activeProfile>
    </activeProfiles>
  </settings>`
  );

  t.end();
});
