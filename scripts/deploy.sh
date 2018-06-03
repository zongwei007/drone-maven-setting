#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build . -t knives/drone-maven-setting
docker push knives/drone-maven-setting
