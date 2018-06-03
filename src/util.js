function xml(literals, ...args) {
  let xml = '';

  literals.forEach((ele, index) => {
    xml += ele + (args[index] || '');
  });

  return xml
    .replace(/>\s+</g, '><')
    .replace(/^\s+</, '<')
    .replace(/>\s+$/, '>')
}

function snakeToCamel(str) {
  return str.replace(/_(\S)/g, function(word) {
    return word.substr(1).toUpperCase();
  });
}

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

module.exports = {
  xml,
  snakeToCamel,
  isObject,
};
