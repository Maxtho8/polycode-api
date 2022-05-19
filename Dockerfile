FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm i --save-dev @types/dockerode

COPY . .

EXPOSE 3001

CMD [ "./node_modules/ts-node/dist/bin.js", "index.ts" ]
