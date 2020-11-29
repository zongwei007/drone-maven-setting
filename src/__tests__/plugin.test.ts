import { assertEquals, assertStrictEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';

import { generateElement, generateSetting, readConfig } from '../plugin.ts';
import { xml } from '../util.ts';
import { TEST_CONFIG_FULL, TEST_CONFIG_EMPTY } from './config-example.ts';

Deno.test('generate element', () => {
  const obj = {
    id: 'server_id',
    username: 'server_user',
    password: 'server_pwd',
  };

  assertStrictEquals(
    generateElement('ele', obj),
    '<ele><id>server_id</id><username>server_user</username><password>server_pwd</password></ele>'
  );
});

Deno.test('generate elements with object or array', () => {
  const obj = {
    id: 'name',
    properties: {
      bar: 1,
    },
    repositories: [{ id: 1 }, { id: 2 }, { id: 3 }],
    plugin_repositories: [],
  };

  assertStrictEquals(
    generateElement('profile', obj),
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
});

Deno.test('generate setting', () => {
  assertStrictEquals(
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
});

Deno.test('readConfig test', () => {
  assertEquals(
    readConfig({
      PWD: '/root',
      PLUGIN_MIRRORS: '[{"id":"private","name":"mirror","mirror_of":"central","url":"url"}]',
      PLUGIN_SERVERS: '[{"id":"server_id","username":"server_user","password":"server_pwd"}]',
      PLUGIN_PROFILES: '[{"id":"profile_id","properties":{"foo":"bar"}}]',
      PLUGIN_ACTIVE_PROFILES: 'profile_id',
      PLUGIN_FAKE_ARRAY: 'foo,bar',
    }),
    { ...TEST_CONFIG_FULL, fake_array: ['foo', 'bar'] }
  );
});

Deno.test('read empty test', () => {
  assertEquals(
    readConfig({
      PWD: '/root',
    }),
    TEST_CONFIG_EMPTY
  );
});
