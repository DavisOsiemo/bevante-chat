#!/usr/bin/env bash

HASH=$(echo $BITBUCKET_COMMIT | cut -c1-7)
ACTION=$1
TAG=${2:-${HASH}}
export IMAGE=$REGISTRY/mkopa/bot:$TAG

function build {
    curl -s -o /tmp/google-cloud-sdk.tar.gz \
        https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-254.0.0-linux-x86.tar.gz \
        && tar -xf /tmp/google-cloud-sdk.tar.gz -C /tmp/ \
        && /tmp/google-cloud-sdk/install.sh -q \
        && source /tmp/google-cloud-sdk/path.bash.inc
    echo $GCLOUD_API_KEYFILE | base64 --decode --ignore-garbage > ./gcloud-api-key.json \
        && gcloud auth activate-service-account --key-file gcloud-api-key.json \
        && gcloud config set project $GCLOUD_PROJECT \
        && gcloud auth configure-docker --quiet \
        && docker build -t $IMAGE . && docker push $IMAGE
}

if [[ $ACTION == 'build' ]]
then
    build
else
    echo "Invalid action"
    exit 113
fi
