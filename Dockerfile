FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install && npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app

CMD ["npm", "run", "start:dev"]