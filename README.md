# drone-maven-setting [![Build Status](https://travis-ci.org/zongwei007/drone-maven-setting.svg?branch=master)](https://travis-ci.org/zongwei007/drone-maven-setting)

用于生成 Maven 配置文件 `settings.xml` 的 Drone 插件。功能基本与  [drone-mvn-auth](https://github.com/robertstettner/drone-mvn-auth) 相似，区别在 Maven 的本地缓存路径和支持更广泛的 maven 配置属性。

## 参数支持

* `servers[]`: server 配置
* `servers[].id`: server id
* `servers[].username`: 认证用户名
* `servers[].password`: 认证密码
* `mirrors[]`: 镜像配置
* `mirrors[].id`: 镜像 id
* `mirrors[].name`: 镜像名称
* `mirrors[].mirror_of`: 镜像范围设置
* `mirrors[].url`: 镜像服务器 url
* `profiles[]`: profile 配置
* `profiles[].id`: profile id
* `profiles[].properties`: profile 属性
* `profiles[].repositories[]`: profile 仓库配置
* `profiles[].repositories[].id`: 仓库 id
* `profiles[].repositories[].name`: 仓库名称
* `profiles[].repositories[].url`: 仓库 url
* `profiles[].repositories[].layout`: 仓库 layout
* `profiles[].plugin_repositories[]`: profile 插件仓库配置
* `profiles[].plugin_repositories[].id`: profile 插件仓库 id
* `profiles[].plugin_repositories[].name`: profile 插件仓库名称
* `profiles[].plugin_repositories[].url`: profile 插件仓库 url
* `profiles[].plugin_repositories[].layout`: profile 插件仓库 layout
* `active_profiles[]`: 当前生效的 profile 列表

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

  settings:
    image: knives/drone-maven-setting
    secrets: [ user_name, user_pass ]
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
