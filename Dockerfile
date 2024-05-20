FROM node:20

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]