import { xml, snakeToCamel, isObject } from './util.ts';
import { TYPE_MAPPING } from './definition.ts';

type ATTRIBUTES = {
  [key: string]: any;
};

export function generateElement(type: string, element: any, attrs: ATTRIBUTES = {}): string {
  const tagName = snakeToCamel(type);

  if (isObject(element)) {
    return xml`
          <${tagName}${generateAttribute(attrs)}>
            ${Object.keys(element)
              .map(key => {
                const tagName = snakeToCamel(key);
                const val = element[key];

                if (isObject(val)) {
                  return generateElement(key, val);
                } else if (Array.isArray(val)) {
                  return generateCollection(type, key)(val);
                } else {
                  return `<${tagName}>${element[key]}</${tagName}>`;
                }
              })
              .join('')}
          </${tagName}>`;
  } else {
    return xml`<${tagName}${generateAttribute(attrs)}>${element}</${tagName}>`;
  }
}

function generateAttribute(attrs: ATTRIBUTES) {
  const result = Object.keys(attrs)
    .map(attr => `${attr}="${attrs[attr]}"`)
    .join(' ');

  return result ? ` ${result}` : '';
}

function generateCollection(parentName: string, fieldName: string): (elements: Array<any>) => string {
  const tagName = snakeToCamel(fieldName);
  const typeName = TYPE_MAPPING[`${parentName}#${fieldName}`];

  if (!typeName) {
    throw new Error(`Can not found type name of location: ${parentName}#${fieldName}`);
  }

  return function(elements) {
    return xml`
      <${tagName}>
        ${elements.map(element => generateElement(typeName, element)).join('')}
      </${tagName}>`;
  };
}

export const generateSetting = function(config: ATTRIBUTES) {
  return generateElement('settings', config, {
    xmlns: 'http://maven.apache.org/SETTINGS/1.0.0',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd',
  });
};

export function readConfig(env: { [key: string]: string }) {
  return Object.keys(env)
    .filter(name => name.startsWith('PLUGIN_'))
    .reduce(
      (memo, key) => {
        const configKey = key.toLowerCase().replace('plugin_', '');

        let configValue = env[key];

        if (configValue) {
          if (configValue.startsWith('[') || configValue.startsWith('{')) {
            memo[configKey] = JSON.parse(configValue);
          } else {
            memo[configKey] = configValue.split(',');
          }
        }

        return memo;
      },
      {
        local_repository: `${env['PWD']}/repo`,
      } as { [key: string]: string | Array<any> | Object }
    );
}
