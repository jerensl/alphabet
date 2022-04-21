# syntax=docker/dockerfile:1

FROM node:lts-alpine
WORKDIR /app/
# install and cache app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# add app
COPY dist/apps/customer-api/ ./

# start app
EXPOSE 5000
CMD node main.js