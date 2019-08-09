# drone-maven-setting [![Build Status](https://travis-ci.org/zongwei007/drone-maven-setting.svg?branch=master)](https://travis-ci.org/zongwei007/drone-maven-setting)

用于生成 Maven 配置文件 `settings.xml` 的 Drone 插件。功能基本与  [drone-mvn-auth](https://github.com/robertstettner/drone-mvn-auth) 相似，区别在 Maven 的本地缓存路径和支持更广泛的 maven 配置属性。

## 参数支持

支持所有的 settings.xml 配置，但需要使用 snake 命名以符合 yml 命名规范。

## 配置样例

```yml
kind: pipeline
name: default

steps:
  - name: restore-cache
    image: drillster/drone-volume-cache
    volumes:
      - name: cache
        path: /cache
    settings:
      restore: true
      mount:
        - ./repo

  - name: build-settings
    image: knives/drone-maven-setting
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

  - name: publish
    image: maven
    environment:
      USER_NAME:
        from_secret: user_name
      USER_PASS:
        from_secret: user_pass
    commands:
      - mvn deploy -s settings.xml
    when:
      event: tag

  - name: rebuild-cache
    image: drillster/drone-volume-cache
    volumes:
      - name: cache
        path: /cache
    settings:
      rebuild: true
      mount:
        - ./repo
    
services:
  - name: redis
    image: redis
    ports:
      - 6379

volumes:
  - name: cache
    host:
      path: /tmp
```
