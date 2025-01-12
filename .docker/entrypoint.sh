#!/bin/bash

npm install
npm run build
npx prisma generate
npx prisma migrate dev
npm run start:dev

# chmod +x .docker/entrypoint.sh
