# syntax=docker/dockerfile:1

FROM node:12-bullseye

WORKDIR /app/

# install and cache app dependencies
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --production
RUN yarn push

# add app
COPY dist/apps/customer-api/ ./
COPY apps/customer-api/vocabulary.txt ./

# start app
EXPOSE 5000
CMD node main.js