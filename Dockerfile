#stage1
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

#stage 2
FROM node
WORKDIR /usr/app
RUN npm install -g pm2
COPY --from=builder /usr/app/dist ./dist

CMD pm2 start dist/index.js
