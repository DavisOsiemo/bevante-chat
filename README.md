# mkopa-demo-bot

## Requirements

- node.js v8+
- docker

## Getting Started

```sh
# create your custom config with env vars
cp ./config/default.json ./config/development.json

# edit the env vars accordingly
nano ./config/development.json

# install dependencies
npm i

# start (dev)
npm run dev

# start (prod)
npm run prod
```

## Dev

```sh
# build
npm run build

# test
npm t

# lint
npm run lint

# typescript check
npm run ts-check
```
