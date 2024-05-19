FROM node:20

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Copy the .env and .env.development files
COPY .env ./

RUN npm run build

CMD ["node", "dist/main"]