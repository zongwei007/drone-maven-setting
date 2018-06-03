const test = require('tape');
const { xml, snakeToCamel, isObject } = require('../src/util');

test('trim space between tags', function(t) {
  t.equal(
    xml`<tag>
      <key>1</key>
      <name>2</name>
    </tag>`,
    '<tag><key>1</key><name>2</name></tag>'
  );

  t.end();
});

test('trim leading space', function(t) {
  t.equal(
    xml`
    <tag/>`,
    '<tag/>'
  );

  t.end();
});

test('trim bottom space', function(t) {
  t.equal(
    xml`<tag/>
    `,
    '<tag/>'
  );

  t.end();
});

test('with parameter', function(t) {
  const type = 'tag';

  const param = {
    foo: 1,
    bar: 2,
  };

  t.equal(
    xml`
    <${type}>
      <key>${param.foo}</key>
      <val>${param.bar}</val>
    </${type}>
    `,
    '<tag><key>1</key><val>2</val></tag>'
  );

  t.end();
});

test('snake to camel test', function(t) {
  t.equal(snakeToCamel('foo_bar'), 'fooBar');
  t.equal(snakeToCamel('foo_bar_ext'), 'fooBarExt');
  t.equal(snakeToCamel('_bar'), 'Bar');
  t.equal(snakeToCamel('foo_'), 'foo_');

  t.end();
});

test('check val is object', function(t) {
  const foo = function() {};
  const bar = class bar {};

  t.ok(isObject({}));
  t.ok(isObject(new foo()));
  t.ok(isObject(new bar()));
  t.notOk(isObject([]));
  t.notOk(isObject(1));
  t.notOk(isObject(null));
  t.notOk(isObject('123'));
  t.notOk(isObject(void 0));
  t.notOk(isObject(''));

  t.end();
});
