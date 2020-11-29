/** 按模板生成 xml 文本。生成结果会去除多余的空白部分。 */
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

/** snake 命名转换为 Camel 命名 */
export function snakeToCamel(str: string) {
  return str.replace(/_(\S)/g, function(word) {
    return word.substr(1).toUpperCase();
  });
}

/** 判断数值是否为一个纯 js 对象 */
export function isObject(val: any) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
