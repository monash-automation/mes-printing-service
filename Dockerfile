FROM node:20-alpine as build
WORKDIR /app
COPY ./package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:20-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist .

CMD serve -s