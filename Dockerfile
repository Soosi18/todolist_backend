FROM node:20.11.1

WORKDIR /usr/src/app
COPY todo-backend/package*.json ./
RUN npm install
COPY todo-backend/. .
CMD [ "npm", "start" ]