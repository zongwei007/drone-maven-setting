# drone-maven-setting [![Build Status](https://travis-ci.org/zongwei007/drone-maven-setting.svg?branch=master)](https://travis-ci.org/zongwei007/drone-maven-setting)

用于生成 Maven 配置文件 `settings.xml` 的 Drone 插件。功能基本与  [drone-mvn-auth](https://github.com/robertstettner/drone-mvn-auth) 相似，区别在 Maven 的本地缓存路径和支持更广泛的 maven 配置属性。

## 参数支持

支持所有的 settings.xml 配置，但需要使用 snake 命名以符合 yml 命名规范。

## 配置样例

```yml
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
    restore: true
    mount:
      - ./repo
    volumes:
      - /tmp/maven:/cache

  build-settings:
    image: knives/drone-maven-setting
    secrets: [ user_name, user_pass ]
    settings:
      servers:
        - id: private-nexus-releases
          username: $${env.USER_NAME}
          password: $${env.USER_PASS}
        - id: private-nexus-snapshots
          username: $${env.USER_NAME}
          password: $${env.USER_PASS}
      profiles:
        - id: drone
          properties:
            redis.url: redis:6379
      active_profiles:
        - drone

  publish:
    image: maven
    commands:
      - mvn deploy -s settings.xml
    when:
      event: tag

  rebuild-cache:
    image: drillster/drone-volume-cache
    rebuild: true
    mount:
      - ./repo
    volumes:
      - /tmp/maven:/cache

services:
  redis:
    image: redis

```
