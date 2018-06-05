const { xml, snakeToCamel, isObject } = require('./util');
const { TYPE_MAPPING } = require('./mapping');

function generateElement(type, attrs = {}) {
  const tagName = snakeToCamel(type);

  return function(element) {
    if (isObject(element)) {
      return xml`
          <${tagName}${generateAttribute(attrs)}>
            ${Object.keys(element)
              .map(key => {
                const tagName = snakeToCamel(key);
                const val = element[key];
                if (isObject(val)) {
                  return generateElement(key)(val);
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
  };
}

function generateAttribute(attrs) {
  const result = Object.keys(attrs)
    .map(attr => `${attr}=${JSON.stringify(attrs[attr])}`)
    .join(' ');

  return result ? ` ${result}` : '';
}

function generateCollection(parentName, fieldName) {
  const tagName = snakeToCamel(fieldName);
  const typeName = TYPE_MAPPING[`${parentName}#${fieldName}`];

  if (!typeName) {
    throw new Error(`Can not found type name of location: ${parentName}#${fieldName}`);
  }

  const generator = generateElement(typeName);
  return function(elements) {
    return xml`
      <${tagName}>
        ${elements.map(generator).join('')}
      </${tagName}>`;
  };
}

const generateSetting = function(config) {
  return generateElement('settings', {
    xmlns: 'http://maven.apache.org/SETTINGS/1.0.0',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xsi:schemaLocation': 'http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd',
  })(config);
};

module.exports = {
  generateElement,
  generateSetting,
};
