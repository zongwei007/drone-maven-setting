export const TEST_CONFIG_FULL = {
  local_repository: '/root/repo',
  mirrors: [
    {
      id: 'private',
      name: 'mirror',
      mirror_of: 'central',
      url: 'url',
    },
  ],
  servers: [
    {
      id: 'server_id',
      username: 'server_user',
      password: 'server_pwd',
    },
  ],
  profiles: [
    {
      id: 'profile_id',
      properties: {
        foo: 'bar',
      },
    },
  ],
  active_profiles: 'profile_id',
};

export const TEST_CONFIG_EMPTY = {
  local_repository: '/root/repo',
};
