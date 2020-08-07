FROM node:14.4.0-alpine

RUN apk add --no-cache --virtual \
      .build-deps \
      bash \
      gcc \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl \
      openssl-dev \
      zlib-dev \
      libc-dev \
      bsd-compat-headers \
      make \
      python \
      py-setuptools

RUN addgroup -S mkopa-demo-bot && adduser -S mkopa-demo-bot -G mkopa-demo-bot
USER mkopa-demo-bot

RUN mkdir -p /home/mkopa-demo-bot
ENV APP_DIR /home/mkopa-demo-bot
WORKDIR $APP_DIR

COPY --chown=mkopa-demo-bot:mkopa-demo-bot config $APP_DIR/config
COPY --chown=mkopa-demo-bot:mkopa-demo-bot src $APP_DIR/src
COPY --chown=mkopa-demo-bot:mkopa-demo-bot tsconfig.json $APP_DIR/tsconfig.json
COPY --chown=mkopa-demo-bot:mkopa-demo-bot package.json $APP_DIR/package.json
RUN npm install && npm run build

VOLUME $APP_DIR/config

ENV NODE_ENV production
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
