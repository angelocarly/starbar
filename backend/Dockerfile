# pull official base image
FROM node:10

# set working directory
WORKDIR /app

ENV NODE_ENV=production

# install app dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --production

COPY . .
RUN npx tsc

EXPOSE 3080

# start app
CMD ["node", "dist/bin/www.js"]
