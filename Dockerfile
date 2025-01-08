FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

COPY . .

USER node

WORKDIR /home/node/app

CMD ["npm", "run", "start:dev"]