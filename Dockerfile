FROM node:22-alpine3.19

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]