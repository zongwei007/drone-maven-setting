const { xml, snakeToCamel, isObject } = require('./util');

function generateElement(type) {
  const rootName = snakeToCamel(type);

  return function(element) {
    return xml`
      <${rootName}>
        ${Object.keys(element)
          .map(key => {
            const tagName = snakeToCamel(key);
            const val = element[key];
            if (isObject(val)) {
              return generateElement(tagName)(val);
            } else if (Array.isArray(val)) {
              //暂不支持嵌套数组
              return '';
            } else {
              return `<${tagName}>${element[key]}</${tagName}>`;
            }
          })
          .join('')}
      </${rootName}>`;
  };
}

const generateRepository = generateElement('repository');
const generatePluginRepository = generateElement('pluginRepository');

const generateMirror = generateElement('mirror');
const generateServer = generateElement('server');
const generateProfile = profile =>
  generateElement('profile')(
    Object.assign({}, profile, {
      repositories: (profile.repositories || []).map(generateRepository).join(''),
      plugin_repositories: (profile.plugin_repositories || []).map(generatePluginRepository).join(''),
    })
  );

const generateActiveProfile = id => `<activeProfile>${id}</activeProfile>`;

const generateSetting = function(config) {
  return xml`
  <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"
  >
    <localRepository>${config.local}</localRepository>
    <mirrors>${config.mirrors.map(generateMirror).join('')}</mirrors>
    <servers>${config.servers.map(generateServer).join('')}</servers>
    <profiles>${config.profiles.map(generateProfile).join('')}</profiles>
    <activeProfiles>${config.active_profiles.map(generateActiveProfile).join('')}</activeProfiles>
  </settings>`;
};

module.exports = {
  generateElement,
  generateSetting,
};
