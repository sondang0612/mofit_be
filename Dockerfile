FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn remove bcrypt && yarn add bcrypt

COPY . .

RUN yarn build

CMD ["yarn", "start"]