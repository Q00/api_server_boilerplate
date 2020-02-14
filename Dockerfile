FROM node:12.16.0-alpine

ENV TZ="/usr/share/zoneinfo/Asia/Seoul"
ENV HOST 0.0.0.0

ARG PROJECT_DIR=/usr/src/app

RUN npm -g install yarn

WORKDIR ${PROJECT_DIR}

COPY . ${PROJECT_DIR}
RUN yarn install

RUN yarn build 

# change this to your custom port
EXPOSE 3000

# RUN start
CMD ["yarn", "start"]
