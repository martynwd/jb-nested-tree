FROM node:16-alpine as packages-install
WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn install

FROM packages-install as build-stage
WORKDIR /app
COPY . .

RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /var/usr/static/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]