#!/bin/bash

npm install
npm run build
npx prisma generate
npm run start:dev

# chmod +x .docker/entrypoint.sh
