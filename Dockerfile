FROM hayd/alpine-deno:1.5.4

RUN deno install --allow-env --allow-write --name=drone-maven-setting "https://raw.githubusercontent.com/zongwei007/drone-maven-setting/master/src/main.ts"

ENTRYPOINT drone-maven-setting
