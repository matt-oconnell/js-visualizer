FROM node:6.0

WORKDIR /code/

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
