FROM mhart/alpine-node:8

WORKDIR /plugin

COPY ./src /plugin

ENV NODE_ENV production

RUN npm prune && npm install

ENTRYPOINT node /plugin/index.js
