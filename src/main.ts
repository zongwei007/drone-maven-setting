import { generateSetting, readConfig } from './plugin.ts';

console.log('generate maven settings.xml');

try {
  const setting = generateSetting(readConfig(Deno.env.toObject()));

  Deno.writeTextFileSync('settings.xml', setting);

  console.log(setting);
} catch (e) {
  console.error('write settings.xml fail.', e);

  Deno.exit(1);
}
