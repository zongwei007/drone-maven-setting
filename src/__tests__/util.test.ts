import { assertStrictEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';

import { xml, snakeToCamel, isObject } from '../util.ts';

Deno.test('trim space between tags', () => {
  assertStrictEquals(
    xml`<tag>
      <key>1</key>
      <name>2</name>
    </tag>`,
    '<tag><key>1</key><name>2</name></tag>'
  );
});

Deno.test('trim space between tags', () => {
  assertStrictEquals(
    xml`<tag>
      <key>1</key>
      <name>2</name>
    </tag>`,
    '<tag><key>1</key><name>2</name></tag>'
  );
});

Deno.test('trim leading space', () => {
  assertStrictEquals(
    xml`
    <tag/>`,
    '<tag/>'
  );
});

Deno.test('trim bottom space', () => {
  assertStrictEquals(
    xml`<tag/>
    `,
    '<tag/>'
  );
});

Deno.test('with parameter', () => {
  const type = 'tag';

  const param = {
    foo: 1,
    bar: 2,
  };

  assertStrictEquals(
    xml`
    <${type}>
      <key>${param.foo}</key>
      <val>${param.bar}</val>
    </${type}>
    `,
    '<tag><key>1</key><val>2</val></tag>'
  );
});

Deno.test('snake to camel test', () => {
  assertStrictEquals(snakeToCamel('foo_bar'), 'fooBar');
  assertStrictEquals(snakeToCamel('foo_bar_ext'), 'fooBarExt');
  assertStrictEquals(snakeToCamel('_bar'), 'Bar');
  assertStrictEquals(snakeToCamel('foo_'), 'foo_');
});

Deno.test('check val is object', () => {
  const foo = function() {};
  const bar = class bar {};

  assertStrictEquals(isObject({}), true);
  assertStrictEquals(isObject(new bar()), true);
  assertStrictEquals(isObject(foo()), false);
  assertStrictEquals(isObject([]), false);
  assertStrictEquals(isObject(1), false);
  assertStrictEquals(isObject(null), false);
  assertStrictEquals(isObject('123'), false);
  assertStrictEquals(isObject(void 0), false);
  assertStrictEquals(isObject(''), false);
});
