FROM node:20-alpine3.20 AS build

WORKDIR /usr/src/app/build

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run generate
RUN npm run build

FROM node:20-alpine3.20 AS prod

WORKDIR /usr/src/app/prod

COPY --from=build /usr/src/app/build/dist ./dist
COPY --from=build /usr/src/app/build/package.json ./package.json
COPY --from=build /usr/src/app/build/package-lock.json ./package-lock.json
COPY --from=build /usr/src/app/build/prisma ./prisma

RUN npm i --production && npm cache clean --force
RUN npm run main

CMD ["node", "./dist/main.js"]

EXPOSE 3000
