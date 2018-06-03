const TEST_CONFIG = {
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

module.exports = {
  TEST_CONFIG,
};
