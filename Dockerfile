# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENTRYPOINT ["sh","-c"]
EXPOSE 4200
CMD ["exec npm start"]
#CMD ["exec npm start"]

# Stage 2
#FROM nginx:1.17.1-alpine
#COPY --from=build-step /app/docs /usr/share/nginx/html
