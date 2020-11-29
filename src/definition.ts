interface MAPPINGS {
  [key: string]: string;
}

const ARRAY_TYPE_MAPPING: MAPPINGS = {
  'settings#plugin_groups': 'plugin_group',
  'settings#proxies': 'proxy',
  'settings#servers': 'server',
  'settings#mirrors': 'mirror',
  'settings#profiles': 'profile',
  'settings#active_profiles': 'active_profile',
  'profile#repositories': 'repository',
  'profile#plugin_repositories': 'plugin_repositorie',
};

export function isArrayType(parent: string, type: string) {
  return !!getArrayType(parent, type);
}

export function getArrayType(parent: string, type: string) {
  return ARRAY_TYPE_MAPPING[`${parent}#${type}`];
}
