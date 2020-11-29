import { generateSetting, readConfig } from './plugin.ts';

console.log('begin to generate maven settings.xml');

try {
  const setting = generateSetting(readConfig(Deno.env.toObject()));

  console.log(setting);

  Deno.writeTextFileSync('settings.xml', setting);
} catch (e) {
  console.error('write settings.xml fail.', e);

  Deno.exit(1);
}

console.log('finish to generate maven settings.xml');
