FROM node:22 AS base

COPY package.json yarn.lock fetchCorpora.js setupTests.js ./
COPY ./public ./public
COPY ./src ./src

RUN yarn install

CMD yarn build && yarn start