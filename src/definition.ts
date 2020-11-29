interface ARRAY_TYPE_MAPPING {
  [key: string]: string;
}

export const TYPE_MAPPING: ARRAY_TYPE_MAPPING = {
  'settings#plugin_groups': 'plugin_group',
  'settings#proxies': 'proxy',
  'settings#servers': 'server',
  'settings#mirrors': 'mirror',
  'settings#profiles': 'profile',
  'settings#active_profiles': 'active_profile',
  'profile#repositories': 'repository',
  'profile#plugin_repositories': 'plugin_repositorie',
};
