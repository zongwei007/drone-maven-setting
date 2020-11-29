export function xml(literals: TemplateStringsArray, ...args: any[]) {
  let xml = '';

  literals.forEach((ele, index) => {
    xml += ele + (args[index] || '');
  });

  return xml
    .replace(/>\s+</g, '><')
    .replace(/^\s+</, '<')
    .replace(/>\s+$/, '>');
}

export function snakeToCamel(str: string) {
  return str.replace(/_(\S)/g, function(word) {
    return word.substr(1).toUpperCase();
  });
}

export function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
