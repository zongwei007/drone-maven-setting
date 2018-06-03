const TEST_CONFIG_FULL = {
  local: '/root/repo',
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
  active_profiles: ['profile_id'],
};

const TEST_CONFIG_EMPTY = {
  local: '/root/repo',
  mirrors: [],
  servers: [],
  profiles: [],
  active_profiles: [],
};

module.exports = {
  TEST_CONFIG_FULL,
  TEST_CONFIG_EMPTY,
};
