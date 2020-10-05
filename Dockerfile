    # "start": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ng serve; ng serve",
    #"build": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ng build --prod; ng build --prod",
FROM node:latest as node

WORKDIR /app
#package*.json ./
COPY . .

#<<<<<<< UI-Changes
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
EXPOSE 4200
CMD ["npm", "start"]

#=======  Just commenting these lines for later reference
# stage 2
#FROM nginx:1.17.1-alpine
#COPY --from=node /app/dist/travel-planner-project /usr/share/nginx/html
# CMD ng serve --host 0.0.0.0
#>>>>>>> Staging
