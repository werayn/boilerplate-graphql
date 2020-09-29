FROM node

WORKDIR /api

COPY . .

CMD [ "yarn", "start:dev"]

